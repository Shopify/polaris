import ReactMarkdown from "react-markdown";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import React from "react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { getIdGenerator, slugify } from "../../utils/various";

interface Props {
  text: string;
  skipH1?: boolean;
}

function Markdown({ text, skipH1 }: Props) {
  const idGenerator = getIdGenerator();

  return (
    <ReactMarkdown
      remarkPlugins={[[remarkGfm, { tablePipeAlign: true }]]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }) => {
          return skipH1 ? <></> : <h1>{children}</h1>;
        },
        h2: ({ children }) => {
          if (children.length === 1 && typeof children[0] === "string") {
            return <h2 id={idGenerator.get(children[0])}>{children}</h2>;
          } else {
            return <h2>{children}</h2>;
          }
        },
        h3: ({ children }) => {
          if (children.length === 1 && typeof children[0] === "string") {
            return <h3 id={idGenerator.get(children[0])}>{children}</h3>;
          } else {
            return <h3>{children}</h3>;
          }
        },
        code: ({ inline, children }) =>
          inline ? (
            <code>{children}</code>
          ) : (
            // Prism auto-wraps code blocks in <pre> and <code> tags
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
        table: ({ children }) => (
          <div className="table-wrapper">
            <table>{children}</table>
          </div>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export default Markdown;
