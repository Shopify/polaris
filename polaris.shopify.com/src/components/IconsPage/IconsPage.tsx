import Head from "next/head";
import Image from "../Image";
import { useState } from "react";
import Fuse from "fuse.js";
import styles from "./IconsPage.module.scss";
import Longform from "../Longform";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import metadata from "@shopify/polaris-icons/metadata";
const importedSvgs = require.context(
  "../../../../polaris-icons/icons",
  true,
  /\.svg$/
);
import { getTitleTagValue } from "../../utils/various";
import IconGrid from "../IconGrid";
import TextField from "../TextField";
import { Dialog } from "@headlessui/react";
import iconCancel from "../../../public/icon-cancel.svg";
import Tooltip from "../Tooltip";
import { useCopyToClipboard } from "../../utils/hooks";
import iconClipboard from "../../../public/icon-clipboard.svg";

let icons = Object.entries(metadata).map(([fileName, icon]) => ({
  ...icon,
  fileName,
}));

const fuse = new Fuse(Object.values(icons), {
  threshold: 0.25,
  keys: [
    { name: "name", weight: 3 },
    { name: "set", weight: 1 },
    { name: "fileName", weight: 1 },
    { name: "description", weight: 1 },
    { name: "keywords", weight: 2 },
  ],
});

function IconsPage() {
  const [filterString, setFilterString] = useState("");
  const [selectedIconName, setSelectedIconName] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const importSnippet = `import {
    ${selectedIconName}
} from '@shopify/polaris-icons';`;

  const usageSnippet = `<Icon
  source={${selectedIconName}}
  color="base" 
/>`;

  const [copyImport, didJustCopyImport] = useCopyToClipboard(importSnippet);
  const [copyUsage, didJustCopyUsage] = useCopyToClipboard(usageSnippet);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  let filteredIcons = [...icons];

  if (filterString) {
    const fuseResults = fuse.search(filterString);
    filteredIcons = fuseResults.map((result) => result.item);
  }
  const majorIcons = filteredIcons.filter((icon) => icon.set === "major");
  const minorIcons = filteredIcons.filter((icon) => icon.set === "minor");

  const selectedIcon = filteredIcons.find(
    (icon) => icon.name === selectedIconName
  );

  if (selectedIconName && !selectedIcon) {
    throw new Error(`Could not find icon ${selectedIconName}`);
  }

  const handleCopy = (type: string) => {
    if (type === "Import") {
      copyImport();
    } else if (type === "Usage") {
      copyUsage();
    }
  };

  if (selectedIcon) {
    console.log(importedSvgs(`./${selectedIcon.fileName}.svg`).default.src);
  }

  const updateURL = `https://github.com/Shopify/polaris-icons/issues/new?assignees=@shopify/icon-guild&labels=Update,Proposal&template=propose-updates-to-existing-icons.md&title=%5BProposal%5D%20Update%20${selectedIconName}`;

  return (
    <MaxPageWidthDiv className={styles.IconsPage}>
      <Head>
        <title>{getTitleTagValue("Icons")}</title>
      </Head>

      <div className={styles.Filter}>
        <h1>Icons</h1>
        <div className={styles.TextField}>
          <TextField
            value={filterString}
            onChange={(value) => setFilterString(value)}
            placeholder="Filter icons"
          />
        </div>
      </div>

      <div className={styles.IconGrids}>
        {majorIcons.length > 0 && (
          <>
            <div className={styles.SectionHeading}>
              <p>
                <b>Major icons.</b> Used for things like lorem ipsum dolor et
                amet consecteur
              </p>
            </div>
            <IconGrid>
              {majorIcons.map((icon) => (
                <IconGrid.Item
                  key={icon.name}
                  icon={icon}
                  onClick={() => {
                    setSelectedIconName(icon.name);
                    openModal();
                  }}
                  isHighlighted={false}
                />
              ))}
            </IconGrid>
          </>
        )}

        {minorIcons.length > 0 && (
          <>
            <div className={styles.SectionHeading}>
              <p>
                <b>Minor icons.</b> Used for things like lorem ipsum dolor et
                amet consecteur
              </p>
            </div>
            <IconGrid>
              {minorIcons.map((icon) => (
                <IconGrid.Item
                  key={icon.name}
                  icon={icon}
                  onClick={() => {}}
                  isHighlighted={false}
                />
              ))}
            </IconGrid>
          </>
        )}
      </div>

      {selectedIcon && (
        <Dialog
          className={styles.ModalContainer}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Dialog.Panel className={styles.Modal}>
            <Dialog.Title as="div" className={styles.ModalHeader}>
              <div className={styles.ModalHeaderLeft}>
                <div
                  className={styles.Preview}
                  style={{ filter: "brightness(-500%)" }}
                >
                  <Image
                    src={importedSvgs(`./${selectedIcon.fileName}.svg`)}
                    alt={metadata[selectedIcon.fileName].description}
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className={styles.IconTitle}>
                  {selectedIcon.name} ({selectedIcon.set})
                </h3>
              </div>
              <button
                type="button"
                className={styles.CancelButton}
                onClick={closeModal}
              >
                <Image
                  src={iconCancel}
                  alt={metadata[selectedIcon.fileName].description}
                  width={25}
                  height={25}
                />
              </button>
            </Dialog.Title>
            <Dialog.Description className={styles.IconDescription}>
              <span className={styles.IconMeta}>
                {metadata[selectedIcon.fileName].description}
              </span>
            </Dialog.Description>
            <hr className={styles.Break} />
            <Longform>
              <div className={styles.SnippetHeader}>
                <h5>Import</h5>
                <div>
                  Learn how to{" "}
                  <a href="https://www.npmjs.com/package/@shopify/polaris-icons#usage">
                    import icons
                  </a>
                </div>
              </div>
              <pre className={styles.CodeSnippet}>
                <div>
                  {`import {
  ${selectedIcon.name}
} from '@shopify/polaris-icons';`}
                </div>
                <div className={styles.IconClipboard}>
                  <Tooltip
                    ariaLabel="Copy to clipboard"
                    placement="top"
                    renderContent={() => (
                      <div className={styles.IconToolTip}>
                        <p>{didJustCopyImport ? "Copied" : "Copy"}</p>
                      </div>
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        handleCopy("Import");
                      }}
                    >
                      <Image
                        src={iconClipboard}
                        alt={"Copy"}
                        width={19}
                        height={19}
                      />
                    </button>
                  </Tooltip>
                </div>
              </pre>
              <div className={styles.SnippetHeader}>
                <h5>Usage</h5>
                <div>
                  Learn more about the{" "}
                  <a href="https://polaris.shopify.com/components/images-and-icons/icon">
                    icon componant
                  </a>
                </div>
              </div>
              <pre className={styles.CodeSnippet}>
                <div>
                  {`<Icon
  source={${selectedIcon.name}}
  color="base" 
/>`}
                </div>
                <div className={styles.IconClipboard}>
                  <Tooltip
                    ariaLabel="Copy to clipboard"
                    placement="top"
                    renderContent={() => (
                      <div className={styles.IconToolTip}>
                        <p>{didJustCopyUsage ? "Copied" : "Copy"}</p>
                      </div>
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        handleCopy("Usage");
                      }}
                    >
                      <Image
                        src={iconClipboard}
                        alt={"Copy"}
                        width={19}
                        height={19}
                      />
                    </button>
                  </Tooltip>
                </div>
              </pre>
              <div className={styles.ModalFooter}>
                <a href={updateURL}>Propose an update to this icon</a>
                <div className={styles.Keywords}>
                  <h5>Keywords</h5>
                  <div className={styles.KeywordsButtonGroup}>
                    {selectedIcon.keywords.map((keyword) => {
                      return (
                        <button
                          type="button"
                          key={keyword}
                          onClick={() => {
                            setFilterString(`${keyword}`);
                          }}
                        >
                          {keyword}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Longform>
            <hr className={styles.Break} />
            <div className={styles.ActionButtons}>
              <a href="https://www.figma.com/community/file/1110993965108325096">
                <button>Polaris Icon Library</button>
              </a>
              <a
                href={
                  importedSvgs(`./${selectedIcon.fileName}.svg`).default.src
                }
                download
              >
                <button>SVG</button>
              </a>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </MaxPageWidthDiv>
  );
}

export default IconsPage;
