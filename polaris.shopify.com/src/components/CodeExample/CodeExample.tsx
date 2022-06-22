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

  return (
    <div className={styles.CodeExample}>
      {title && (
        <div className={styles.TitleBar}>
          <div className={styles.Title}>{title}</div>
        </div>
      )}
      <div className={styles.CopyButtonWrapper}>
        <Tooltip
          ariaLabel="Copy to clipboard"
          placement="top"
          renderContent={() => (
            <div className={styles.IconToolTip}>
              <p>{didJustCopy ? "Copied" : "Copy"}</p>
            </div>
          )}
        >
          <button type="button" className={styles.CopyButton} onClick={copy}>
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
      </div>

      <div className={styles.Code}>{children.toString().trim()}</div>
    </div>
  );
}

export default CodeExample;
