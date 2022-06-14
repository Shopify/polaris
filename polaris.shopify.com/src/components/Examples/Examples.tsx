import { ChangeEvent, useState } from "react";
import CodeExample from "../CodeExample";
import styles from "./Examples.module.scss";
import { ChevronDownMinor } from "@shopify/polaris-icons";

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
  const { code, description, fileName, title } = examples[currentIndex];
  const exampleUrl = `/examples/${fileName.replace(".tsx", "")}`;
  const handleSelection = (ev: ChangeEvent) => {
    const value = (ev.target as HTMLInputElement).value;

    setIndex(parseInt(value, 10));
  };

  if (!examples?.length) return null;

  return (
    <div>
      <div className={styles.TopLine}>
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
            <ChevronDownMinor />
          </div>
        </div>
      </div>
      {description ? <p>{description}</p> : null}
      <div className={styles.ExampleFrame}>
        <iframe src={exampleUrl} height="400px" width="100%" />
      </div>
      {code ? (
        <CodeExample language="typescript" title={`${title} Example`}>
          {code}
        </CodeExample>
      ) : null}
    </div>
  );
};

export default Examples;
