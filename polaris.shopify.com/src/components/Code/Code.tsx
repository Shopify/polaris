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

  const plainCodeSample = children ? (
    <div className={styles.PlainCode}>
      <div className={styles.CopyButtonOverlay}>
        <CopyButton code={children as string} />
      </div>
      <HighlightedCode code={children as string} />
    </div>
  ) : null;

  const titledCodeSample =
    tabs && tabs.length === 1 ? (
      <>
        <div className={styles.TopBar}>
          <div className={styles.Tabs}>
            <div className={styles.Tab}>{tabs[0].title}</div>
          </div>
          <CopyButton code={tabs[0].code} />
        </div>
        <HighlightedCode code={tabs[0].code} />
      </>
    ) : null;

  const tabbedCodeSamples =
    tabs && tabs.length > 1 ? (
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

  return (
    <div className={styles.Code}>
      {plainCodeSample}
      {titledCodeSample}
      {tabbedCodeSamples}
    </div>
  );
}

function HighlightedCode({ code }: { code: string }) {
  return (
    <div
      className={styles.HighlightedCode}
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(code, Prism.languages.javascript, "javasript"),
      }}
    ></div>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copy, didJustCopy] = useCopyToClipboard(code);

  return (
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
  );
}

export default Code;
