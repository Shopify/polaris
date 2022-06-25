import ReactMarkdown from "react-markdown";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import React from "react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import classNames from "classnames";
import { slugify } from "../../utils/various";

import styles from "./Markdown.module.scss";

interface Props {
  text: string;
  skipH1?: boolean;
}

function Markdown({ text, skipH1 }: Props) {
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
        code: ({ children }) => (
          <span
            className={classNames(styles.Code, inline && styles.inline)}
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
            <div className={styles.QuickStartCard}>
              <div className={styles.QuickStartTable__Wrapper}>
                <table className={styles.QuickStartTable}>{children}</table>
              </div>
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
