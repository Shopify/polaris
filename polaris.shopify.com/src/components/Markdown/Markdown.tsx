import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { slugify } from "../../utils/various";

import Code from "../Code";

import styles from "./Markdown.module.scss";

interface Props {
  text: string;
  skipH1?: boolean;
}

function Markdown({ text, skipH1 }: Props) {
  return (
    <div className={styles.Markdown}>
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
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "jsx");
            const lang = match ? match[1] : "jsx";

            return (
              <Code inline={inline} language={lang}>
                {String(children)}
              </Code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;
