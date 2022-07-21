import Tooltip from "../Tooltip";
import Prism from "prismjs";
import { useCopyToClipboard } from "../../utils/hooks";
import styles from "./Code.module.scss";
import { Tab } from "@headlessui/react";
import Image from "../Image";

interface Props {
  tabs: {
    title: string;
    code: string;
  }[];
}

function Code({ tabs }: Props) {
  return (
    <div className={styles.Code}>
      {tabs.length === 1 ? (
        <>
          <div className={styles.TopBar}>
            <div className={styles.Tabs}>
              <div className={styles.Tab}>{tabs[0].title}</div>
            </div>
            <CopyButton code={tabs[0].code} />
          </div>
          <HighlightedCode code={tabs[0].code} />
        </>
      ) : (
        <Tab.Group>
          <div className={styles.TopBar}>
            <Tab.List className={styles.Tabs}>
              {tabs.map(({ title }) => (
                <Tab key={title} className={styles.Tab}>
                  {title}
                </Tab>
              ))}
            </Tab.List>
            <CopyButton code={"TODO"} />
          </div>

          <Tab.Panels>
            {tabs.map(({ title, code }) => (
              <Tab.Panel key={title}>
                <HighlightedCode code={code} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  );
}

function HighlightedCode({ code }: { code: string }) {
  return (
    <div
      className={styles.ActualCode}
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(code, Prism.languages.javascript, "javasript"),
      }}
    ></div>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copy, didJustCopy] = useCopyToClipboard(code);

  return (
    <div className={styles.CopyButtonWrapper}>
      <Tooltip
        ariaLabel="Copy to clipboard"
        renderContent={() => <p>{didJustCopy ? "Copied" : "Copy"}</p>}
      >
        <button
          type="button"
          className={styles.CopyButton}
          onClick={copy}
          aria-label="Copy to clipboard"
        >
          <Image
            src="/icons/ClipboardMinor.svg"
            alt="Clipboard icon"
            width={16}
            height={16}
            icon
          />
        </button>
      </Tooltip>
    </div>
  );
}

export default Code;
