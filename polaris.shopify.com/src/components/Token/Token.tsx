import { createVar } from "@shopify/polaris-tokens";
import { useCopyToClipboard } from "../../utils/hooks";
import { className } from "../../utils/various";
import styles from "./Token.module.scss";

interface Props {
  name: string;
  description?: string;
  value: string;
  bigGap?: boolean;
  renderPreview: () => React.ReactNode;
}

function Token({ name, description, bigGap, renderPreview }: Props) {
  const variableName = createVar(name);
  const [copy, didJustCopy] = useCopyToClipboard(`var(${variableName})`);

  return (
    <div
      className={className(
        styles.Token,
        didJustCopy && styles.didJustCopy,
        bigGap && styles.bigGap
      )}
      id={name}
    >
      <button
        onClick={copy}
        onKeyUp={(evt) => {
          if (evt.code === "Enter" || evt.code === "Space") {
            copy();
            evt.preventDefault();
          }
        }}
      >
        {renderPreview()}
        <p className={styles.Name}>
          <span style={{ opacity: 0.4 }}>--p-</span>
          {name}
        </p>
      </button>
      <p className={styles.Description}>{description}</p>
    </div>
  );
}

export default Token;
