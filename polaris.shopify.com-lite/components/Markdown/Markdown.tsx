import ReactMarkdown from 'react-markdown';
import React from 'react';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import Code from '@/components/Code';

interface Props {
  children: string;
}

function Markdown({children: text}: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[[remarkGfm, {tablePipeAlign: true}]]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      components={{
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
        br: () => <></>,
        hr: () => <></>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export default Markdown;
