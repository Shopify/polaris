import ReactMarkdown from 'react-markdown';
import React from 'react';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import Code from '@/components/Code';

interface Props {
  children: string;
  strip?: boolean;
}

function Markdown({strip, children: text}: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[[remarkGfm, {tablePipeAlign: true}]]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      components={
        strip
          ? {
              br: () => <></>,
              hr: () => <></>,
              a: ({children}) => <>{children}</>,
            }
          : {
              h2: ({children, id}) => (
                <h2 id={id}>
                  {children} <a href={`#${id}`}>🔗</a>
                </h2>
              ),
              code: ({inline, children, className}) =>
                inline ? (
                  <code>{children}</code>
                ) : (
                  <Code
                    snippets={[
                      {
                        id: 'example',
                        label: 'Example',
                        language: 'typescript',
                        code: children.toString(),
                      },
                    ]}
                  />
                ),
              table: ({children}) => (
                <div className="table-wrapper">
                  <table>{children}</table>
                </div>
              ),
              br: () => <></>,
              hr: () => <></>,
            }
      }
    >
      {text}
    </ReactMarkdown>
  );
}

export default Markdown;
