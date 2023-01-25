import ReactMarkdown from 'react-markdown';
import React from 'react';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import {visit} from 'unist-util-visit';
import type {Plugin} from 'unified';
import {slugify} from '../../utils/various';
import Code from '../Code';

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

interface Props {
  children: string;
  components?: React.ComponentProps<typeof ReactMarkdown>['components'];
  remarkPlugins?: React.ComponentProps<typeof ReactMarkdown>['remarkPlugins'];
  rehypePlugins?: React.ComponentProps<typeof ReactMarkdown>['rehypePlugins'];
  remarkRehypeOptions?: React.ComponentProps<
    typeof ReactMarkdown
  >['remarkRehypeOptions'];
}

function Markdown({
  children: text,
  components,
  remarkPlugins,
  rehypePlugins,
  remarkRehypeOptions,
}: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[
        [remarkGfm, {tablePipeAlign: true}],
        codeMetaAsDataAttribute,
        ...(remarkPlugins ?? []),
      ]}
      rehypePlugins={[rehypeRaw, ...(rehypePlugins ?? [])]}
      remarkRehypeOptions={remarkRehypeOptions}
      components={{
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
        code: ({inline, children}) =>
          inline ? (
            <code>{children}</code>
          ) : (
            <Code code={{title: 'Example', code: children.toString()}} />
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
