import { useEffect, useState } from "react";
import styles from "./Examples.module.scss";
import CodesandboxButton from "../CodesandboxButton";
import Code from "../Code";
import { Tab } from "@headlessui/react";
import { className } from "../../utils/various";

export type Example = {
  code: string;
  description: string;
  fileName: string;
  title: string;
};

interface Props {
  examples: [Example];
}

// https://stackoverflow.com/a/60338028
function formatHTML(html: string): string {
  const tab = "  ";
  let result = "";
  let indent = "";

  html.split(/>\s*</).forEach((element) => {
    if (element.match(/^\/\w/)) {
      indent = indent.substring(tab.length);
    }
    result += indent + "<" + element + ">\r\n";

    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
      indent += tab;
    }
  });

  return result.substring(1, result.length - 3);
}

const Examples = (props: Props) => {
  const { examples } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [htmlCode, setHTMLCode] = useState("");

  const [iframeHeight, setIframeHeight] = useState("400px");

  const handleExampleLoad = () => {
    let attempts = 0;

    const waitForExampleContent = setInterval(() => {
      const exampleIframe = document.getElementById(
        "examples-iframe"
      ) as HTMLIFrameElement;
      const exampleElement = exampleIframe?.contentDocument;
      const exampleWrapper = exampleElement?.getElementById("polaris-example");

      const padding = 192;
      let newHeight = padding;

      if (exampleWrapper) {
        newHeight += exampleWrapper?.offsetHeight;
        setIframeHeight(`${newHeight}px`);
        setHTMLCode(formatHTML(exampleWrapper.innerHTML));
        clearInterval(waitForExampleContent);
      }

      attempts++;

      if (attempts > 10) {
        clearInterval(waitForExampleContent);
      }
    }, 100);

    return () => {
      clearInterval(waitForExampleContent);
    };
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [examples]);

  return (
    <>
      <h2 id="examples">Examples</h2>

      <Tab.Group
        defaultIndex={0}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <Tab.List>
          <div className={styles.ExamplesList}>
            {examples.map((example) => {
              return (
                <Tab key={example.fileName}>
                  <span>{example.title}</span>
                </Tab>
              );
            })}
          </div>
        </Tab.List>

        <Tab.Panels>
          {examples.map(({ fileName, description, code }) => {
            const exampleUrl = `/examples/${fileName.replace(".tsx", "")}`;

            return (
              <Tab.Panel key={fileName}>
                {description ? <p>{description}</p> : null}
                <div className={styles.ExampleFrame}>
                  <iframe
                    src={exampleUrl}
                    height={iframeHeight}
                    width="100%"
                    onLoad={handleExampleLoad}
                    id="examples-iframe"
                  />
                  <div className={className(styles.Buttons, "light-mode")}>
                    <CodesandboxButton
                      className={styles.CodesandboxButton}
                      code={code}
                    />
                  </div>
                </div>

                <Code
                  tabs={[
                    { title: "React", code: code.trim() },
                    { title: "HTML", code: htmlCode },
                  ]}
                />
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default Examples;
