import Image from "../Image";
import { useState } from "react";
import TextField from "../TextField";
import icons from "../../data/icons.json";
import Fuse from "fuse.js";
import styles from "./IconGallery.module.scss";
import Longform from "../Longform";
import { Tab } from "@headlessui/react";

interface Props {}

const fuse = new Fuse(icons, {
  threshold: 0.25,
  keys: [
    { name: "title", weight: 3 },
    { name: "description", weight: 1 },
    { name: "keywords", weight: 2 },
  ],
});

function IconGallery({}: Props) {
  const [filterString, setFilterString] = useState("");
  const [selectedIconName, setSelectedIconName] = useState<string>();

  let filteredIcons = icons;
  if (filterString) {
    const fuseResults = fuse.search(filterString);
    filteredIcons = fuseResults.map((result) => result.item);
  }

  const majorIcons = filteredIcons.filter((icon) => icon.set === "major");
  const minorIcons = filteredIcons.filter((icon) => icon.set === "minor");

  const selectedIcon = icons.find((icon) => icon.name === selectedIconName);

  if (selectedIconName && !selectedIcon) {
    throw new Error(`Could not find icon ${selectedIconName}`);
  }

  return (
    <div className={styles.IconGallery}>
      <div style={{ flex: 1 }}>
        <div className={styles.Filter}>
          <h2>Icons</h2>
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
                filteredIcons={majorIcons}
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
                filteredIcons={minorIcons}
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
                src={`/icons/${selectedIcon.fileName}.svg`}
                alt={selectedIcon.description}
                width={48}
                height={48}
              />
            </div>

            <div className={styles.IconMeta}>
              {selectedIcon.fileName}
              {selectedIcon.description}
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
                      Import the Icon component and the {selectedIcon.name}{" "}
                      icon:
                    </p>
                    <pre>{`import { Icon } from "@shopify/polaris";
import { ${selectedIcon.fileName} } from "@shopify/polaris-icons";

<Icon source={${selectedIcon.fileName}} color="base" />`}</pre>
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
                      <a href={`/icons/${selectedIcon.fileName}.svg`} download>
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
    </div>
  );
}

function IconGrid({
  filteredIcons,
  selectedIconName,
  onClick,
}: {
  filteredIcons: typeof icons;
  selectedIconName: string | undefined;
  onClick: (iconName: string) => void;
}) {
  return (
    <ul className={styles.IconGrid}>
      {filteredIcons.map((icon) => (
        <li
          key={`${icon.name}+${icon.set}`}
          className={[
            styles.Icon,
            selectedIconName === icon.name ? styles.current : null,
          ].join(" ")}
        >
          <button onClick={() => onClick(icon.name)}>
            <div style={{ filter: "brightness(-500%)" }}>
              <Image
                src={`/icons/${icon.fileName}.svg`}
                alt={icon.description}
                width={16}
                height={16}
              />
            </div>
            <span style={{ fontSize: 12, color: "#aaa" }}>{icon.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default IconGallery;
