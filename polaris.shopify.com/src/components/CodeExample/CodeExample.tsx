import Image from "../Image";
import Tooltip from "../Tooltip";
import iconClipboard from "../../../public/icon-clipboard.svg";
import styles from "./CodeExample.module.scss";
import { useCopyToClipboard } from "../../utils/hooks";

interface Props {
  language: "terminal" | "typescript";
  title?: string;
  children: string;
}

function CodeExample({ title, children }: Props) {
  const [copy, didJustCopy] = useCopyToClipboard(children);
  const lines = children.split("\n");

  return (
    <div className={styles.CodeExample}>
      {title && (
        <div className={styles.TitleBar}>
          <div className={styles.Title}>{title}</div>
        </div>
      )}
      <Tooltip
        ariaLabel="Copy to clipboard"
        placement="top"
        renderContent={() => (
          <div className={styles.IconToolTip}>
            <p>{didJustCopy ? "Copied" : "Copy"}</p>
          </div>
        )}
      >
        <button type="button" onClick={copy} className={styles.CopyButton}>
          <Image
            src={iconClipboard}
            alt="Copy"
            width={16}
            height={16}
            fadeIn={false}
            icon
          />
        </button>
      </Tooltip>

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
