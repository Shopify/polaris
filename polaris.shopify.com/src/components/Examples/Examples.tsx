import { ChangeEvent, useState } from "react";
import CodeExample from "../CodeExample";
import styles from "./Examples.module.scss";

interface Example {
  description: string;
  fileName: string;
  title: string;
}

interface Props {
  examples: [Example];
}

const Examples = (props: Props) => {
  const { examples } = props;
  const [currentIndex, setIndex] = useState("0");
  const { code, description, fileName } = examples[currentIndex];
  const exampleUrl = `/examples/${fileName.replace(".tsx", "")}`;
  const handleSelection = (ev: ChangeEvent) => {
    setIndex((ev.target as HTMLInputElement).value);
  };

  if (!examples?.length) return null;

  return (
    <div>
      <h1>Examples</h1>
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
      {description ? <p>{description}</p> : null}
      <div className={styles.Example}>
        <iframe src={exampleUrl} height="400px" width="100%" />
      </div>
      {code ? (
        <CodeExample language="typescript" title="title tk">
          {code}
        </CodeExample>
      ) : null}
    </div>
  );
};

export default Examples;
