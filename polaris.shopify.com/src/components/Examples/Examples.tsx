import { getParameters } from "codesandbox/lib/api/define";
import { ChangeEvent, useState } from "react";
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
  const { code, description, fileName, title } = examples[currentIndex];
  const exampleUrl = `/examples/${fileName.replace(".tsx", "")}`;
  const handleSelection = (ev: ChangeEvent) => {
    const value = (ev.target as HTMLInputElement).value;

    setIndex(parseInt(value, 10));
  };

  if (!examples?.length) return null;

  return (
    <div>
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
      <div
        className={`${styles.Buttons} ${
          showPreview && styles.ButtonsOverlayed
        }`}
      >
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
        <CodesandboxButton className={styles.SandboxButton} code={code} />
      </div>
      {showPreview ? (
        <div className={styles.ExampleFrame}>
          <iframe src={exampleUrl} height="400px" width="100%" />
        </div>
      ) : (
        <CodeExample language="typescript" title={`${title} Example`}>
          {code}
        </CodeExample>
      )}
    </div>
  );
};

export default Examples;
