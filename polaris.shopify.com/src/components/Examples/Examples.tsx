import { useEffect, useRef, useState } from "react";
import styles from "./Examples.module.scss";
import CodesandboxButton from "../CodesandboxButton";
import CodeExample from "../CodeExample";
import { Tab } from "@headlessui/react";

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

  html.split(/>\s*</).forEach(function (element) {
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleExampleLoad = () => {
    const waitForExampleContent = setInterval(() => {
      const exampleElement =
        iframeRef?.current?.contentWindow?.document?.getElementById(
          "polaris-example"
        );
      const padding = 192;
      let newHeight = padding;

      if (exampleElement) {
        newHeight += exampleElement?.offsetHeight;
      }

      if (exampleElement) {
        setHTMLCode(formatHTML(exampleElement.innerHTML));
        clearInterval(waitForExampleContent);
      } else {
        console.log("no example element");
      }

      setIframeHeight(`${newHeight}px`);
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
                    ref={iframeRef}
                  />
                  <div className={styles.Buttons}>
                    <CodesandboxButton
                      className={styles.CodesandboxButton}
                      code={code}
                    />
                  </div>
                </div>

                <CodeExample language="html">{htmlCode}</CodeExample>
                <CodeExample language="typescript">{code}</CodeExample>
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default Examples;
