import ReactMarkdown from 'react-markdown';
import remarkUnwrapImages from 'remark-unwrap-images';
import React from 'react';
import styles from './Markdown.module.scss';
import {Box} from '../Box';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import {visit} from 'unist-util-visit';
import type {Plugin} from 'unified';
import {slugify} from '../../utils/various';
import Code from '../Code';
import {SideBySide} from './components';

// rehype-raw will strip the non-HTML-standard `meta` field from the node when
// converting the parsed markdown to HTML, so we have to capture it in a
// different property which wont be stripped out.
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

type MDXComponent = React.ComponentType<
  React.PropsWithChildren<{[key: string]: any}>
>;

type MDXComponents = {
  [key: string]: MDXComponent;
};

interface Props {
  children: string;
  mdxComponents?: MDXComponents;
  components?: React.ComponentProps<typeof ReactMarkdown>['components'];
  remarkPlugins?: React.ComponentProps<typeof ReactMarkdown>['remarkPlugins'];
  rehypePlugins?: React.ComponentProps<typeof ReactMarkdown>['rehypePlugins'];
  remarkRehypeOptions?: React.ComponentProps<
    typeof ReactMarkdown
  >['remarkRehypeOptions'];
}

const defaultMDXComponents: MDXComponents = {
  SideBySide: SideBySide as MDXComponent,
};

function Markdown({
  children: text,
  components,
  mdxComponents,
  remarkPlugins,
  rehypePlugins,
  remarkRehypeOptions,
}: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[
        [remarkGfm, {tablePipeAlign: true}],
        remarkUnwrapImages,
        ...(remarkPlugins ?? []),
        codeMetaAsDataAttribute,
      ]}
      rehypePlugins={[rehypeRaw, rehypeSlug, ...(rehypePlugins ?? [])]}
      remarkRehypeOptions={remarkRehypeOptions}
      components={{
        // @ts-expect-error react-markdown doesn't understand custom attributes
        div: ({as, ...props}) => {
          // poor man's MDX
          const Component =
            mdxComponents?.[as] ?? defaultMDXComponents?.[as] ?? Box;
          return <Component {...props} />;
        },
        h1: ({children}) => {
          return <h1>{children}</h1>;
        },
        h2: ({children}) => {
          if (children.length === 1 && typeof children[0] === 'string') {
            return <h2 id={slugify(children[0])}>{children}</h2>;
          } else {
            return <h2>{children}</h2>;
          }
        },
        h3: ({children}) => {
          if (children.length === 1 && typeof children[0] === 'string') {
            return <h3 id={slugify(children[0])}>{children}</h3>;
          } else {
            return <h3>{children}</h3>;
          }
        },
        img: ({src, alt, style}) =>
          src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt ?? ''} className={styles.MarkdownImage} style={style} />
          ) : null,
        code: ({inline, children, className}) =>
          inline ? (
            <code>{children}</code>
          ) : (
            <Code
              code={{className, title: 'Example', code: children.toString()}}
            />
          ),
        table: ({children}) => (
          <div className="table-wrapper">
            <table>{children}</table>
          </div>
        ),
        ...components,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export default Markdown;
