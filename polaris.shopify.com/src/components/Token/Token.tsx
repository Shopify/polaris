import { useCopyToClipboard } from "../../utils/hooks";
import styles from "./Token.module.scss";

interface Props {
  name: string;
  description: string;
  value: string;
  bigGap?: boolean;
  renderPreview: () => React.ReactNode;
}

function Token({ name, description, value, bigGap, renderPreview }: Props) {
  const [copy, didJustCopy] = useCopyToClipboard(`var(--p-${name})`);

  return (
    <button
      className={[
        styles.Token,
        didJustCopy && styles.didJustCopy,
        bigGap && styles.bigGap,
      ].join(" ")}
      onClick={copy}
      onKeyUp={(evt) => {
        if (evt.code === "Enter" || evt.code === "Space") {
          copy();
          evt.preventDefault();
        }
      }}
      id={name}
    >
      {renderPreview()}
      <p className={styles.Name}>
        <span style={{ opacity: 0.4 }}>--p-</span>
        {name}
      </p>
      <div className={styles.CopyInfo}>
        {didJustCopy ? "✌️ Copied to clipboard" : "Click to copy"}
      </div>
    </button>
  );
}

export default Token;
