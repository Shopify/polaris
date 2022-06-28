import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Examples.module.scss";
import CodesandboxButton from "../CodesandboxButton";
import CodeExample from "../CodeExample";
import Select from "../Select";

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
  const [currentIndex, setIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const {
    code = "",
    description,
    fileName = "",
  } = examples[currentIndex] || {};
  const exampleUrl = `/examples/${fileName.replace(".tsx", "")}`;
  const handleSelection = (ev: ChangeEvent<HTMLSelectElement>) => {
    const value = ev.target.value;

    setIndex(parseInt(value, 10));
  };

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
    setIndex(0);
    setShowPreview(true);
  }, [examples]);

  if (!examples?.length || !examples[currentIndex]) {
    return null;
  }

  const options = examples.map(({ fileName, title }, index) => {
    return { label: title, value: String(index) };
  });

  return (
    <>
      <h2 id="examples">Examples</h2>
      <Select
        labelHidden
        label="Component example"
        id="Component-Example-Select"
        options={options}
        onChange={handleSelection}
      />
      {description ? <p>{description}</p> : null}

      <div className={styles.Buttons}>
        <div>
          <button
            className={`${styles.Button} ${
              showPreview ? styles.ButtonSelected : ""
            }`}
            onClick={() => setShowPreview(true)}
          >
            Preview
          </button>
          <button
            className={`${styles.Button} ${
              showPreview ? "" : styles.ButtonSelected
            }`}
            onClick={() => setShowPreview(false)}
          >
            Code
          </button>
        </div>
        <CodesandboxButton className={styles.SandboxButton} code={code} />
      </div>
      {showPreview ? (
        <div className={styles.ExampleFrame}>
          <iframe
            src={exampleUrl}
            height={iframeHeight}
            width="100%"
            onLoad={handleExampleLoad}
            ref={iframeRef}
          />
        </div>
      ) : (
        <CodeExample language="typescript">{code}</CodeExample>
      )}
    </>
  );
};

export default Examples;
