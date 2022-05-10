import Image from "../Image";
import { useState } from "react";
import Fuse from "fuse.js";
import { Tab } from "@headlessui/react";
import metadata from '@shopify/polaris-icons/metadata';

import TextField from "../TextField";
import styles from "./IconGallery.module.scss";
import Longform from "../Longform";
import { className } from "../../utils/various";

const importedSvgs = require.context(
  "../../../../polaris-icons/icons",
  true,
  /\.svg$/
);

const fuse = new Fuse(Object.keys(metadata), {
  threshold: 0.25,
  keys: [
    { name: "title", weight: 3 },
    { name: "description", weight: 1 },
    { name: "keywords", weight: 2 },
  ],
});

function IconGallery() {
  const [filterString, setFilterString] = useState("");
  const [selectedIconName, setSelectedIconName] = useState<string>();

  let filteredIcons = Object.keys(metadata);
  if (filterString) {
    const fuseResults = fuse.search(filterString);
    filteredIcons = fuseResults.map((result) => result.item);
  }
  const majorIcons = filteredIcons.filter((iconName: string) => iconName.includes('Major'));
  const minorIcons = filteredIcons.filter((iconName: string) => iconName.includes('Minor'));

  const selectedIcon = filteredIcons.find((iconName: string) => iconName === selectedIconName);

  if (selectedIconName && !selectedIcon) {
    throw new Error(`Could not find icon ${selectedIconName}`);
  }

  return (
    <div className={styles.IconGallery}>
      <div style={{ flex: 1 }}>
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
              <IconGrid
                iconNames={majorIcons}
                selectedIconName={selectedIconName}
                onClick={(iconName) => setSelectedIconName(iconName)}
              />
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
              <IconGrid
                iconNames={minorIcons}
                selectedIconName={selectedIconName}
                onClick={(iconName) => setSelectedIconName(iconName)}
              />
            </>
          )}
        </div>
      </div>

      {selectedIcon && (
        <div className={styles.Sidebar}>
          <div className={styles.SidebarInner}>
            <div
              className={styles.Preview}
              style={{ filter: "brightness(-500%)" }}
            >
              <Image
                src={importedSvgs(`./${selectedIcon}.svg`)}
                alt={metadata[selectedIcon].description}
                width={48}
                height={48}
              />
            </div>

            <div className={styles.IconMeta}>
              {selectedIcon}
              {metadata[selectedIcon].description}
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
                      Import the Icon component and the {metadata[selectedIcon].name}{" "}
                      icon:
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
                      <a href={`/icons/${selectedIcon}.svg`} download>
                        {selectedIcon}.svg
                      </a>
                    </p>
                  </Longform>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      )}
    </div>
  );
}

function IconGrid({
  iconNames,
  selectedIconName,
  onClick,
}: {
  iconNames: string[];
  selectedIconName: string | undefined;
  onClick: (iconName: string) => void;
}) {
  return (
    <ul className={styles.IconGrid}>
      {iconNames.map((iconName) => (
        <li
          key={`${iconName}`}
          className={className(
            styles.Icon,
            selectedIconName === iconName && styles.current
          )}
        >
        <button onClick={() => onClick(iconName)}>
          <div style={{ filter: "brightness(-500%)" }}>
            <Image
              src={importedSvgs(`./${iconName}.svg`)}
              alt={metadata[iconName].description}
              width={16}
              height={16}
            />
          </div>
          <span style={{ fontSize: 12, color: "#aaa" }}>{metadata[iconName].name}</span>
        </button>
      </li>
      ))}
    </ul>
  );
}

export default IconGallery;
