import Head from "next/head";
import { useState, useRef, useCallback } from "react";
import { Dialog } from "@headlessui/react";
import Fuse from "fuse.js";
import styles from "./IconsPage.module.scss";
import Container from "../Container";
import metadata from "@shopify/polaris-icons/metadata";
const importedSvgs = require.context(
  "../../../../polaris-icons/icons",
  true,
  /\.svg$/
);
import { className, getTitleTagValue, slugify } from "../../utils/various";
import IconGrid from "../IconGrid";
import TextField from "../TextField";
import CodeExample from "../CodeExample";
import Image from "../Image";
import { Icon } from "../../types";
import { useEffect } from "react";
import { useMedia } from "../../utils/hooks";
import { useRouter } from "next/router";

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
  const useModal = useMedia("screen and (max-width: 1400px)");
  const [filterString, setFilterString] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<Icon>(icons[0]);
  const isInitialLoad = useRef(true);
  let [modalIsOpen, setModalIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isInitialLoad.current === false) {
      setModalIsOpen(true);
    }
    isInitialLoad.current = false;
  }, [selectedIcon]);

  let filteredIcons = [...icons];

  if (filterString) {
    const fuseResults = fuse.search(filterString);
    filteredIcons = fuseResults.map((result) => result.item);
  }

  const majorIcons = filteredIcons.filter((icon) => icon.set === "major");
  const minorIcons = filteredIcons.filter((icon) => icon.set === "minor");

  const getSelectedIcon = (iconParam: Icon) => {
    const foundIcon = icons.find(
      (icon) => icon.name === iconParam.name && icon.set === iconParam.set
    );
    if (!foundIcon) {
      throw new Error(`Could not find icon ${iconParam.name}`);
    }
    setSelectedIcon(foundIcon);
  };

  const setSelectedIconBasedOnParam = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const iconParam = urlParams.get("icon");
    if (iconParam) {
      const matchingIcon = icons.find((icon) => icon.fileName === iconParam);
      if (matchingIcon) {
        getSelectedIcon(matchingIcon);
        setFilterString(matchingIcon.fileName);
      }
    }
  }, []);

  useEffect(() => {
    setSelectedIconBasedOnParam();
    router.events.on("routeChangeComplete", setSelectedIconBasedOnParam);

    return () => {
      router.events.off("routeChangeComplete", setSelectedIconBasedOnParam);
    };
  }, [setSelectedIconBasedOnParam, router.events]);

  return (
    <Container className={styles.IconsPage}>
      <Head>
        <title>{getTitleTagValue("Icons")}</title>
      </Head>

      <div className={styles.Filter}>
        <h1>Icons</h1>
      </div>

      <div className={styles.SplitLayout}>
        <div className={styles.IconGrids}>
          <div className={styles.TextField}>
            <TextField
              value={filterString}
              onChange={(value) => setFilterString(value)}
              placeholder="Filter icons"
            />
          </div>

          {majorIcons.length > 0 && (
            <>
              <div className={styles.SectionHeading}>
                <p>
                  <b>Major icons</b>
                </p>
              </div>
              <IconGrid>
                {majorIcons.map((icon) => (
                  <IconGrid.Item
                    key={icon.name}
                    icon={icon}
                    onClick={() => {
                      window.history.pushState(
                        {},
                        "",
                        `?icon=${icon.fileName}`
                      );
                      getSelectedIcon(icon);
                    }}
                    isSelected={selectedIcon.fileName === icon.fileName}
                  />
                ))}
              </IconGrid>
            </>
          )}

          {minorIcons.length > 0 && (
            <>
              <div className={styles.SectionHeading}>
                <p>
                  <b>Minor icons</b>
                </p>
              </div>

              <IconGrid>
                {minorIcons.map((icon) => (
                  <IconGrid.Item
                    key={icon.name}
                    icon={icon}
                    onClick={() => getSelectedIcon(icon)}
                  />
                ))}
              </IconGrid>
            </>
          )}
        </div>

        {selectedIcon && (
          <>
            {useModal ? (
              <Dialog open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <div className={styles.ModalBackdrop} aria-hidden="true" />

                <Dialog.Panel className={styles.Modal}>
                  <SidebarContent
                    selectedIcon={selectedIcon}
                    setFilterString={setFilterString}
                    isInModal={true}
                  />
                </Dialog.Panel>
              </Dialog>
            ) : (
              <SidebarContent
                selectedIcon={selectedIcon}
                setFilterString={setFilterString}
                isInModal={false}
              />
            )}
          </>
        )}
      </div>
    </Container>
  );
}

function SidebarContent({
  selectedIcon,
  setFilterString,
  isInModal,
}: {
  selectedIcon: Icon;
  setFilterString: (string: string) => void;
  isInModal: boolean;
}) {
  const updateURL = `https://github.com/Shopify/polaris-icons/issues/new?assignees=@shopify/icon-guild&labels=Update,Proposal&template=propose-updates-to-existing-icons.md&title=%5BProposal%5D%20Update%20${selectedIcon.name}`;

  return (
    <div className={styles.Sidebar}>
      <div className={className(styles.SidebarSection, styles.IconInfo)}>
        <div className={styles.Preview}>
          <div className={styles.PreviewImage}>
            <Image
              src={importedSvgs(`./${selectedIcon.fileName}.svg`)}
              alt={metadata[selectedIcon.fileName].description}
              width={20}
              height={20}
              icon
            />
          </div>
          <div className={styles.IconSet}>{selectedIcon.set}</div>
        </div>

        <h2 className={styles.IconName}>
          {isInModal ? (
            <Dialog.Title>{selectedIcon.name}</Dialog.Title>
          ) : (
            selectedIcon.name
          )}
        </h2>

        {selectedIcon.description !== "N/A" && (
          <p className={styles.IconDescription}>{selectedIcon.description}</p>
        )}

        <div className={styles.Keywords}>
          {selectedIcon.keywords
            .filter((keyword) => keyword !== "N/A")
            .map((keyword) => {
              return (
                <button
                  type="button"
                  key={keyword}
                  onClick={() => setFilterString(`${keyword}`)}
                >
                  {keyword}
                </button>
              );
            })}
        </div>

        <div className={styles.ActionButtons}>
          <a
            className={styles.DownloadIconButton}
            href={`/icons/${selectedIcon.fileName}.svg`}
            download
          >
            Download SVG
          </a>
        </div>
      </div>

      <div className={styles.SidebarSection}>
        <h3>Figma</h3>
        <p className={styles.SmallParagraph}>
          Use the{" "}
          <a href="https://www.figma.com/community/file/1110993965108325096">
            Polaris Icon Library
          </a>{" "}
          to access all icons right inside Figma.
        </p>
      </div>

      <div className={styles.SidebarSection}>
        <h3>React</h3>
        <p className={styles.SmallParagraph}>
          Import the icon from{" "}
          <a href="https://www.npmjs.com/package/@shopify/polaris-icons#usage">
            polaris-icons
          </a>
          :
        </p>

        <div className={styles.CodeExampleWrapper}>
          <CodeExample language="typescript">
            {`import {
  ${selectedIcon.name}
} from '@shopify/polaris-icons';`}
          </CodeExample>
        </div>

        <p className={styles.SmallParagraph}>
          Then render it using the{" "}
          <a href="https://polaris.shopify.com/components/images-and-icons/icon">
            icon component
          </a>
          :
        </p>

        <div className={styles.CodeExampleWrapper}>
          <CodeExample language="typescript">
            {`<Icon
  source={${selectedIcon.name}}
  color="base"
/>`}
          </CodeExample>
        </div>
      </div>
      <div className={styles.SidebarSection}>
        <div className={styles.ProposeChange}>
          <a href={updateURL}>Propose a change to this icon</a>
        </div>
      </div>
    </div>
  );
}

export default IconsPage;
