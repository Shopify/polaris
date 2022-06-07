import Image from "next/image";
import Tooltip from "../Tooltip";
import iconCancel from "../../../public/icon-cancel.svg";
import iconClipboard from "../../../public/icon-clipboard.svg";
import styles from "./CodeExample.module.scss";
import { useCopyToClipboard } from "../../utils/hooks";

interface Props {
  language: "terminal" | "typescript";
  title: string;
  children: string;
}

function CodeExample({ title, children }: Props) {
  const [copy, didJustCopy] = useCopyToClipboard(children);
  const lines = children.split("\n");

  return (
    <div className={styles.CodeExample}>
      <div className={styles.TitleBar}>
        <div className={styles.Title}>{title}</div>
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
            <Image src={iconClipboard} alt="Copy" width={19} height={19} />
          </button>
        </Tooltip>
      </div>

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
