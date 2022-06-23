import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Examples.module.scss";
import CodesandboxButton from "../CodesandboxButton";
import CodeExample from "../CodeExample";
import Image from "../Image";
import iconChevronDown from "../../../public/chevron-down.svg";

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
  const handleSelection = (ev: ChangeEvent) => {
    const value = (ev.target as HTMLInputElement).value;

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
  }, [examples]);

  if (!examples?.length || !examples[currentIndex]) {
    return null;
  }

  return (
    <>
      <h2 id="examples">Examples</h2>
      <div className={styles.SelectContainer}>
        <select onChange={handleSelection}>
          {examples.map((example, index) => {
            const { fileName, title } = example;

            return (
              <option key={fileName} value={index}>
                {title}
              </option>
            );
          })}
        </select>
        <div className={styles.SelectIcon}>
          <Image
            src={iconChevronDown}
            alt="Down Arrow"
            width={16}
            height={16}
            fadeIn={false}
            icon
          />
        </div>
      </div>

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
