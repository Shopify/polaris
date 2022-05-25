import styles from "./CodeExample.module.scss";

interface Props {
  language: "terminal" | "typescript";
  title: string;
  children: string;
}

function CodeExample({ title, children }: Props) {
  const lines = children.split("\n");
  return (
    <div className={styles.CodeExample}>
      <div className={styles.Title}>{title}</div>
      <div className={styles.Code}>
        {lines.map((line, i) => (
          <div className={styles.Line} key={line}>
            <span className={styles.LineNumber}>{i + 1}</span> {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CodeExample;
