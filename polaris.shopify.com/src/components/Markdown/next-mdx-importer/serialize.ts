import type {Plugin} from 'unified';
import type {Literal} from 'unist';
import {VFile} from 'vfile';
import {visit, type Node} from 'unist-util-visit';
import type {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {serialize as nextMdxSerialize} from 'next-mdx-remote/serialize';
import {is as isVFile} from 'vfile-is';

import {componentName, filePathProp, scopeKey} from './constants';

// Because this isn't exported by next-mdx-remote, we have to pull it off the
// function directly.
type MDXSerializeParameters = Parameters<typeof nextMdxSerialize>;
type MDXSerializeTrailingArgs = MDXSerializeParameters extends [
  source: any,
  options?: any,
  ...rest: infer Rest,
]
  ? Rest
  : never;

type LoadFn = (
  /**
   * Will be a fully qualified URL based on the `url` option set and any
   * relative import paths.
   *
   * For example, given url = `file://content/posts.md`, and the files:
   * file://content/posts.md
   * ```
   * import Authors from './authors.md'
   * <Authors />
   * ```
   *
   * /content/authors.md
   * ```
   * import Jess from './authors/jess.md';
   * <Jess />
   * ```
   *
   * /content/authors/jess.md
   * ```
   * import Avatar from '../common/avatar.md'
   * <Avatar alt="Jess's face" src="https://placekitten.com/100/100 />
   * ```
   *
   * load() will be called three times:
   * 1. load(`file://content/authors.md`)
   * 2. load(`file://content/authors/jess.md`)
   * 3. load(`file://content/common/avatar.md`)
   */
  url: string,
) => string | Promise<string>;

export type SerializeOptions = MDXSerializeParameters[1] & {
  /**
   * Load the markdown contents from the given url.
   */
  load?: LoadFn;
  /**
   * For internal use to avoid loading the same file multiple times
   */
  [scopeKey]?: Record<string, SerializeResult>;
};

type ExtendScope<
  TScope extends Record<string, unknown> = Record<string, unknown>,
  TFrontmatter extends Record<string, unknown> = Record<string, unknown>,
> = TScope & {
  [scopeKey]: Record<string, SerializeResult<TScope, TFrontmatter>>;
};

export type SerializeResult<
  TScope extends Record<string, unknown> = Record<string, unknown>,
  TFrontmatter extends Record<string, unknown> = Record<string, unknown>,
> = MDXRemoteSerializeResult<ExtendScope<TScope, TFrontmatter>, TFrontmatter>;

declare module 'vfile' {
  // The `.data` type for our VFiles needs to know about the imports the plugin
  // discovers.
  interface DataMap {
    [scopeKey]: string[];
  }
}

// FIXME: What's the official type? I can't find it exported from unist or other
// modules.
interface ESNode extends Node {
  data?: {
    estree?: {
      body: [
        {
          type: string;
          specifiers: [{type: string; local: {name: string}}];
          source: Literal<string>;
        },
      ];
    };
  };
}

function resolveUrl(maybeRelativePath: string, basePath: string = '/'): string {
  const baseAsURL = new URL(basePath, 'file:');
  const tmpVFile = new VFile(new URL(maybeRelativePath, baseAsURL));
  return tmpVFile.path;
}

function remarkImportScanner(): Plugin {
  return (tree, vfile) => {
    const importMap: Record<string, string> = {};
    const identifierCache: Record<string, string> = {};

    // Find all default imports
    visit(tree, 'mdxjsEsm', (node: ESNode) => {
      const body = node.data?.estree?.body ?? [];
      for (let index = body.length - 1; index >= 0; index--) {
        const importEsNode = body[index];
        if (importEsNode?.type !== 'ImportDeclaration') {
          continue;
        }

        const identifier = importEsNode.specifiers?.find(
          ({type}) => type === 'ImportDefaultSpecifier',
        )?.local?.name;

        // We only care about default imports
        if (!identifier) {
          continue;
        }

        if (identifierCache[identifier]) {
          throw new Error(
            `Detected multiple import identifiers of "${identifier}" within "${vfile.path}".`,
          );
        }

        if (!vfile.path) {
          throw new Error(`VFile must have .path set.`);
        }

        const fromPath = resolveUrl(importEsNode.source?.value, vfile.path);

        if (importMap[fromPath]) {
          throw new Error(
            `Detected multiple imports of "${fromPath}" within "${vfile.path}".`,
          );
        }

        // Remove the node from the tree
        body.splice(index, 1);

        importMap[fromPath] = identifier;
        identifierCache[identifier] = fromPath;
      }
    });

    // Find all uses of the previously discovered imports and rewrite them to
    // use our special component
    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
      if (identifierCache[node.name]) {
        // Inject the file path as a prop
        node.attributes = node.attributes || [];
        node.attributes.push({
          type: 'mdxJsxAttribute',
          name: filePathProp,
          value: identifierCache[node.name],
        });
        // Rewrite to componentName to use our renderer
        node.name = componentName;
      }
    });

    // Ensure the list of files to load are available outside the plugin
    vfile.data[scopeKey] = Object.keys(importMap);
  };
}

export function pathToVFile(pathOrVFile: string | VFile): VFile {
  let file: VFile;
  if (isVFile(pathOrVFile)) {
    // Make a shallow copy of the file to pass to the MDX serializer. This ensures
    // the setting of `.value`, etc, doesn't leak outside of this module.
    file = new VFile(pathOrVFile);
  } else {
    if (typeof pathOrVFile !== 'string') {
      throw new Error(
        'Must supply either a string path, or a VFile with .path set',
      );
    }
    file = new VFile();

    // TODO: Actually validate this is a path of some kind?
    file.path = pathOrVFile;
  }

  return file;
}

export async function serialize<
  TScope extends Record<string, unknown> = Record<string, unknown>,
  TFrontmatter extends Record<string, unknown> = Record<string, unknown>,
>(
  /**
   * A path or a VFile with the .path set indicating the markdown to load via
   * the `load()` method.
   *
   * If a VFile is passed with both .path and .value, .value is used instead of
   * calling `load()`.
   *
   * Also used to determine paths for relative imports then passed to `load()`,
   * and as a cache ID to avoid infinite loops on circular imports.
   *
   * Example: When loading from disk it could be `/User/bar/content/foo.md`.
   *
   * Example: When loading from a database, you can make up your own path
   * syntax. Let's say you have a table `posts` and want to load the item with
   * id `abc123`, then the path could be `/posts/abc123`.
   */
  pathOrVFile: string | VFile,
  {
    load,
    scope,
    [scopeKey]: previouslyLoaded,
    ...mdxSerializeOptions
  }: SerializeOptions = {},
  ...args: MDXSerializeTrailingArgs
): Promise<SerializeResult<TScope, TFrontmatter>> {
  const file = pathToVFile(pathOrVFile);

  // Use the already-loaded value if provided
  if (!file.value) {
    // When no value is provided, the .path _must_ exist or we have no way of
    // loading it.
    if (!file.path) {
      throw new Error(`VFile must have .path set.`);
    }

    if (!load) {
      throw new Error(
        `Must provide options.load to enable file loading. Attempted to load "${file.path}"`,
      );
    }
    // Directly load the entry point content. All subsequent loads will be handled
    // after the entry MDX is serialized.
    file.value = await load(file.path);
  }

  const result = await nextMdxSerialize<
    ExtendScope<TScope, TFrontmatter>,
    TFrontmatter
  >(
    file,
    // Inject our plugin here
    {
      ...mdxSerializeOptions,
      //Spread scope to avoid circular references
      scope: {...scope},
      mdxOptions: {
        ...mdxSerializeOptions?.mdxOptions,
        remarkPlugins: [
          remarkImportScanner,
          ...(mdxSerializeOptions?.mdxOptions?.remarkPlugins || []),
        ],
      },
    },
    // Make sure we pass through other args like `rsc`
    ...args,
  );

  // Convert the array of file paths to a keyed object of serialized files.
  // ['/foo/bar.md', '/zip/zap.md']
  // becomes
  // {
  //   '/foo/bar.md': <serialized file>,
  //   '/zip/zap.md': <serialized file>,
  // }
  const serializedImports = Object.fromEntries(
    await Promise.all(
      (file.data[scopeKey] ?? []).map(async (fromPath) => [
        fromPath,
        previouslyLoaded?.[fromPath] ??
          (await serialize<TScope, TFrontmatter>(
            fromPath,
            {load, scope, ...mdxSerializeOptions},
            ...args,
          )),
      ]),
    ),
  );

  result.scope = result.scope ?? {};
  result.scope[scopeKey] = {
    ...result.scope[scopeKey],
    ...serializedImports,
  };

  return result;
}
