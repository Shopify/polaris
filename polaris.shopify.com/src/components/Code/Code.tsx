import { useState } from "react";
import Prism from "prismjs";
import { Tab } from "@headlessui/react";

import Tooltip from "../Tooltip";
import Image from "../Image";

import { useCopyToClipboard } from "../../utils/hooks";

import styles from "./Code.module.scss";

interface Props {
  tabs?: {
    title: string;
    code: string;
  }[];

  children?: React.ReactNode;
}

function Code({ tabs, children }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabMarkup = tabs ? (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <div className={styles.TopBar}>
        <Tab.List className={styles.Tabs}>
          {tabs.map(({ title }) => (
            <Tab key={title} className={styles.Tab}>
              {title}
            </Tab>
          ))}
        </Tab.List>
        <CopyButton code={tabs[selectedIndex].code} />
      </div>

      <Tab.Panels>
        {tabs.map(({ title, code }) => (
          <Tab.Panel key={title}>
            <HighlightedCode code={code} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  ) : null;

  const plainCodeSnippet = children ? (
    <div className={styles.PlainCode}>
      <HighlightedCode code={children as string} />
      <div className={styles.CopyButtonWrapper}>
        <CopyButton code={children as string} />
      </div>
    </div>
  ) : null;

  return (
    <div className={styles.Code}>
      {tabMarkup}
      {plainCodeSnippet}
    </div>
  );
}

function HighlightedCode({ code }: { code: string }) {
  return (
    <div
      className={styles.HightlightedCode}
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
