import ReactMarkdown from "react-markdown";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import React from "react";
import rehypeRaw from "rehype-raw";
import { slugify } from "../../utils/various";

interface Props {
  text: string;
  skipH1?: boolean;
}

function Markdown({ text, skipH1 }: Props) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }) => {
          return skipH1 ? <></> : <h1>{children}</h1>;
        },
        h2: ({ children }) => {
          if (children.length === 1 && typeof children[0] === "string") {
            return <h2 id={slugify(children[0])}>{children}</h2>;
          } else {
            return <h2>{children}</h2>;
          }
        },
        h3: ({ children }) => {
          if (children.length === 1 && typeof children[0] === "string") {
            return <h3 id={slugify(children[0])}>{children}</h3>;
          } else {
            return <h3>{children}</h3>;
          }
        },
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
        table: ({ children }) => {
          return (
            <div className="table-wrapper">
              <table>{children}</table>
            </div>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export default Markdown;
