import Head from "next/head";
import Image from "../Image";
import { useState } from "react";
import Fuse from "fuse.js";
import styles from "./IconsPage.module.scss";
import Longform from "../Longform";
import { Tab } from "@headlessui/react";
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
        <div className={styles.Modal}>
          <div className={styles.ModalInner}>
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

            <div className={styles.IconMeta}>
              {metadata[selectedIcon.fileName].description}
            </div>

            <Tab.Group>
              <Tab.List className={styles.Tabs}>
                <Tab className={styles.Tab}>React</Tab>
                <Tab className={styles.Tab}>Figma</Tab>
                <Tab className={styles.Tab}>Download</Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  <Longform>
                    <p>Install the dependencies:</p>
                    <pre>{`yarn add polaris polaris-icons`}</pre>

                    <p>
                      Import the Icon component and the{" "}
                      {metadata[selectedIcon.fileName].name} icon:
                    </p>
                    <pre>{`import { Icon } from "@shopify/polaris";
import { ${selectedIcon} } from "@shopify/polaris-icons";

<Icon source={${selectedIcon}} color="base" />`}</pre>
                  </Longform>
                </Tab.Panel>

                <Tab.Panel>
                  <Longform>
                    <p>
                      From inside Figma, enable{" "}
                      <a href="https://www.figma.com/community/file/930503928500000754">
                        the Polaris icon library
                      </a>
                      . The add the file from the assets pane.
                    </p>
                  </Longform>
                </Tab.Panel>

                <Tab.Panel>
                  <Longform>
                    <p>
                      <a
                        href={
                          importedSvgs(`./${selectedIcon.fileName}.svg`).default
                            .src
                        }
                        download
                      >
                        {selectedIcon.fileName}.svg
                      </a>
                    </p>
                  </Longform>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      )}
    </MaxPageWidthDiv>
  );
}

export default IconsPage;
