import React, { useEffect } from "react";
import Prism, { LanguageMap, Grammar } from "prismjs";
import markdown from "prismjs/components/prism-markdown";
import jsx from "prismjs/components/prism-jsx";
import yaml from "prismjs/components/prism-yaml";
import css from "prismjs/components/prism-css";
import markup from "prismjs/components/prism-markup";
import shell from "prismjs/components/prism-bash";
import git from "prismjs/components/prism-git";

const codeLanguages: LanguageMap = {
  markdown,
  jsx,
  markup,
  css,
  yaml,
  shell,
  git,
};

interface Props {
  inline?: boolean;
  language?: string;
  children: string;
}

const Code = ({ children, language = "jsx", inline = false }: Props) => {
  useEffect(() => {
    const lang = codeLanguages[language];
    Prism.highlight(String(children), lang, "jsx");
  });

  return <span>{children}</span>;
};

export default Code;
