import Tooltip from "../Tooltip";
import Prism from "prismjs";
import { useCopyToClipboard } from "../../utils/hooks";
import styles from "./CodeExample.module.scss";
import { className } from "../../utils/various";

interface Props {
  language: "terminal" | "typescript";
  title?: string;
  minimalist?: boolean;
  children: string;
}

function CodeExample({ minimalist, children }: Props) {
  const [copy, didJustCopy] = useCopyToClipboard(children);

  return (
    <div
      className={className(styles.CodeExample, minimalist && styles.minimalist)}
    >
      <div className={styles.CopyButtonWrapper}>
        <Tooltip
          ariaLabel="Copy to clipboard"
          renderContent={() => (
            <div className={styles.IconToolTip}>
              <p>{didJustCopy ? "Copied" : "Copy"}</p>
            </div>
          )}
        >
          <button
            type="button"
            className={styles.CopyButton}
            onClick={copy}
            aria-label="Copy to clipboard"
          >
            <ClipboardIcon />
          </button>
        </Tooltip>
      </div>

      {minimalist ? (
        <div className={styles.Code}>{children}</div>
      ) : (
        <div
          className={styles.Code}
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              String(children).trim(),
              Prism.languages.javascript,
              "javasript"
            ),
          }}
        ></div>
      )}
    </div>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 2a1 1 0 011 1v13.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 014 16.5V3a1 1 0 112 0v1a2 2 0 002 2h4a2 2 0 002-2V3a1 1 0 011-1zm-4 2H9a1 1 0 110-2h2a1 1 0 110 2z"
        fill="#fff"
      />
    </svg>
  );
}

export default CodeExample;
