import {type MDXRemoteSerializeResult} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import remarkUnwrapImages from 'remark-unwrap-images';
import {VFile, type Data} from 'vfile';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import {visit, type Node, type Parent} from 'unist-util-visit';
import type {Plugin} from 'unified';

import remarkExtractFirstParagraph, {
  type Handler,
} from './remark-extract-first-paragraph';

export type DefaultScope = Record<string, unknown>;
export type DefaultFrontmatter = Record<string, unknown>;
export type SerializedMdx<
  TFrontmatter = DefaultFrontmatter,
  TScope = DefaultScope,
> = MDXRemoteSerializeResult<TScope, TFrontmatter>;

function codeAsContext(): Plugin {
  return (tree) => {
    // Gather up all the code elements
    const codes: {
      node: Node;
      parent: Parent;
      index: number;
      meta: Record<string, any>;
    }[] = [];
    visit(tree, 'code', (node, index, parent) => {
      // console.log('visiting code:', JSON.stringify(node, null, 2));
      if (node.meta) {
        try {
          codes.push({
            node,
            index: index!,
            parent,
            meta: JSON.parse(node.meta),
          });
        } catch (error) {
          // Just ignore this block
        }
      }
    });

    // Iterate over all the code elements, matching wrappers with ids
    codes
      // Ignore anything which doesn't self-identify as wrapping another
      .filter(
        ({meta}) =>
          ['previewContext', 'sandboxContext'].includes(meta.type) && meta.for,
      )
      // sort descending so when we splice these nodes out of their parents, all
      // following indexes are still valid
      .sort((a, b) => b.index - a.index)
      .forEach(({node, meta, index, parent}) => {
        if (meta.for === meta.id) {
          console.warn(
            `Code block specifies { for: "${meta.for}", id: "${meta.id}" }, which would cause an infinite loop.`,
          );
          return;
        }

        const forCode = codes.find(
          (otherNode) => otherNode.meta.id === meta.for,
        );

        if (!forCode) {
          console.warn(
            `Code block specifies { for: "${meta.for}" }, but could not find matching { id: "${meta.for}" }`,
          );
          return;
        }

        // @ts-expect-error Yes, it does exist Typescript. Shhhhh
        forCode.meta[meta.type] = node.value;

        // Delete this code block from the tree
        parent.children.splice(index, 1);
      });

    // For all the code blocks who might now be wrapped, re-encode the modified
    // meta and stick it back on the node
    codes
      .filter(({meta}) => meta.id)
      .forEach(({node, meta}) => {
        // @ts-expect-error Yes, it does exist Typescript. Shhhhh
        node.meta = JSON.stringify(meta);
      });
  };
}

// next-mdx-remote#serialize will strip the non-HTML-standard `meta` field from
// pre nodes (```) when  converting the parsed markdown to HTML, so we have to
// capture it in a different property which wont be stripped out. The
// `.data.hProperties` will be accessible in the `code` component renderer as
// props.
function codeMetaAsDataAttribute(): Plugin {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.meta) {
        const data = node.data || (node.data = {});
        const props = data.hProperties || (data.hProperties = {});
        props.meta = node.meta;
      }
    });
  };
}

const passThroughChildren: Handler = (node) => {
  if (Array.isArray(node)) {
    return node.flatMap(
      (childNode) =>
        ('children' in childNode && childNode.children) || undefined,
    );
  }
  return ('children' in node && node.children) || undefined;
};

// NOTE: This function can work on the client side, but it's meant to be used on
// the server. To reduce client bundle size, this function should only be
// imported directly in a page level component, and not exported from this
// folder's index file.
export const serializeMdx = async <
  TFrontmatter = Record<string, unknown>,
  TScope = Record<string, unknown>,
>(
  content: string,
  {
    mdxOptions,
    scope,
  }: {
    mdxOptions?: Exclude<
      Parameters<typeof serialize>[1],
      undefined
    >['mdxOptions'];
    scope?: Exclude<Parameters<typeof serialize>[1], undefined>['scope'];
  } = {},
): Promise<[SerializedMdx<TFrontmatter, TScope>, Data]> => {
  const file = new VFile(content);
  const remarkPlugins = [
    [remarkGfm, {tablePipeAlign: true}],
    remarkUnwrapImages,
    remarkSlug,
    ...(mdxOptions?.remarkPlugins ?? []),
    codeAsContext,
    codeMetaAsDataAttribute,
    [
      remarkExtractFirstParagraph,
      {
        remove: [
          // Don't consider images at all
          'image',
          // Handle JSX elements by passing through their children
          ['mdxJsxFlowElement', passThroughChildren],
          ['mdxJsxTextElement', passThroughChildren],
          ['mdxFlowExpression', passThroughChildren],
          ['mdxTextExpression', passThroughChildren],
        ],
      },
    ],
  ];
  const result = await serialize<TScope, TFrontmatter>(file, {
    parseFrontmatter: true,
    scope,
    mdxOptions: {
      ...mdxOptions,
      remarkPlugins: [...mdxOptions?.remarkPlugins, ...remarkPlugins],
    },
  });
  return [result, file.data];
};
