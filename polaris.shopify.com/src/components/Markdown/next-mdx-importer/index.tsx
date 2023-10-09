import {
  MDXRemote as NextMDXRemote,
  type MDXRemoteProps,
  type MDXRemoteSerializeResult,
} from 'next-mdx-remote';

import {componentName, filePathProp, scopeKey} from './constants';

// Re-export for convenience
export type {MDXRemoteProps};

type ImportsOnScope<TScope, TFrontmatter> = Record<
  string,
  MDXRemoteSerializeResult<TScope, TFrontmatter>
>;

export function MDXRemote<
  TScope extends Record<string, unknown>,
  TFrontmatter extends Record<string, unknown>,
>({
  scope,
  components,
  ...props
}: MDXRemoteProps<TScope, TFrontmatter>): JSX.Element {
  const importsOnScope = scope?.[scopeKey] as
    | ImportsOnScope<TScope, TFrontmatter>
    | undefined;

  return (
    <NextMDXRemote
      {...props}
      scope={scope}
      components={{
        ...components,
        [componentName]: ({
          [filePathProp]: filePath,
          ...scopeForImportedComponent
        }) => {
          // filePath is injected onto the component by our serialize function
          const importedMdx = importsOnScope?.[filePath];
          if (!importedMdx) {
            console.warn(
              `[remark-next-mdx-importer] Attempted to render "${filePath}" which is not in known set of imports: "${Object.keys(
                importsOnScope ?? {},
              ).join('", "')}".`,
            );
            return null;
          }

          const {[scopeKey]: _, ...parentScopeWithoutImports} = scope ?? {};

          return (
            // Support nested imports by calling recursively
            // TODO: How do we prevent infinite loops?
            <MDXRemote
              // Ensure we pass any relevant props from the parent render (eg;
              // lazy)
              {...props}
              // This is the output from an earlier "serialize" call
              {...importedMdx}
              // Merge scope from the serialize call with props passed in the
              // markdown
              scope={{
                ...parentScopeWithoutImports,
                ...importedMdx.scope,
                // Any props passed to the imported component should show up as scope
                // within that componment, and will override any global scope
                ...scopeForImportedComponent,
              }}
              // Pass through the components
              components={components}
            />
          );
        },
      }}
    />
  );
}
