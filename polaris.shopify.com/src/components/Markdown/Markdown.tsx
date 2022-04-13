import ReactMarkdown from "react-markdown";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import React from "react";
import rehypeRaw from "rehype-raw";

interface Props {
  text: string;
}

function Markdown({ text }: Props) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        code: ({ node, inline, className, children, ...props }) => (
          <span
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                String(children),
                Prism.languages.javascript,
                "javasript"
              ),
            }}
          ></span>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export default Markdown;
