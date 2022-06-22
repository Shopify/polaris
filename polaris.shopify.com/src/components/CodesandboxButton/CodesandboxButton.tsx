import { getParameters } from "codesandbox/lib/api/define";
import styles from "./CodesandboxButton.module.scss";

const getAppCode = (code: string) => {
  const lineWithFunctionName = code
    .split("\n")
    .filter((name) => name.match(/function .*Example/g))?.[0];
  const functionName = lineWithFunctionName
    ? lineWithFunctionName.replace("function ", "").replace("() {", "")
    : "Example";
  const exportLine = `export default ${functionName};`;
  let appCode = "";

  appCode += code;
  appCode += "\n";
  appCode += exportLine;

  return appCode;
};

const indexCode = `
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
import "@shopify/polaris/build/esm/styles.css";

const app = <AppProvider i18n={en}><App /></AppProvider>;

ReactDOM.render(app, document.getElementById("root"));
`;

interface Props {
  className: string;
  code: string;
}

const CodesandboxButton = (props: Props) => {
  const { className, code } = props;

  const parameters = getParameters({
    files: {
      "package.json": {
        content: {
          dependencies: {
            react: "latest",
            "react-dom": "latest",
            "@shopify/polaris": "latest",
            "@shopify/polaris-icons": "latest",
          },
        } as any,
        isBinary: false,
      },
      "App.js": {
        content: getAppCode(code),
        isBinary: false,
      },
      "index.js": {
        content: indexCode,
        isBinary: false,
      },
      "index.html": {
        content: '<div id="root"></div>',
        isBinary: false,
      },
    },
  });

  return (
    <form
      action="https://codesandbox.io/api/v1/sandboxes/define"
      method="POST"
      target="_blank"
      className={className}
    >
      <input type="hidden" name="parameters" value={parameters} />
      <input type="hidden" name="query" value="module=App.js" />
      <button type="submit" className={styles.Button}>
        Edit in Codesandbox
      </button>
    </form>
  );
};

export default CodesandboxButton;
