import { useEffect, useRef, useState } from "react";
import styles from "./Examples.module.scss";
import CodesandboxButton from "../CodesandboxButton";
import CodeExample from "../CodeExample";
import Markdown from "../Markdown";
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

const Examples = (props: Props) => {
  const { examples } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [iframeHeight, setIframeHeight] = useState("400px");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleExampleLoad = () => {
    const exampleElement =
      iframeRef?.current?.contentWindow?.document?.getElementById(
        "polaris-example"
      );
    const padding = 192;
    let newHeight = padding;

    if (exampleElement) {
      newHeight += exampleElement?.offsetHeight;
    }

    setIframeHeight(`${newHeight}px`);
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
                {description ? <Markdown text={description} /> : null}
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
