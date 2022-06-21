import ReactMarkdown from "react-markdown";
import "prismjs/themes/default.css";
import Prism, { Languages } from "prismjs";
import React from "react";
import rehypeRaw from "rehype-raw";

type CodeLanguage = "jsx" | "markup" | "scss" | "shell" | "plaintext";

interface Props {
  lang: CodeLanguage;
  text: string;
}

function Code({ text, lang }: Props) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        code: ({ node, inline, className, children, ...props }) => (
          <span
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                String(children),
                Prism.languages[lang],
                lang
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

export default Code;
