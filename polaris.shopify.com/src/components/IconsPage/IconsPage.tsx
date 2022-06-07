import Head from "next/head";
import { useState } from "react";
import Fuse from "fuse.js";
import styles from "./IconsPage.module.scss";
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
import CodeExample from "../CodeExample";
import { LinkButton } from "../Button/Button";
import Button from "../Button";

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

  const updateURL = `https://github.com/Shopify/polaris-icons/issues/new?assignees=@shopify/icon-guild&labels=Update,Proposal&template=propose-updates-to-existing-icons.md&title=%5BProposal%5D%20Update%20${selectedIconName}`;

  return (
    <MaxPageWidthDiv className={styles.IconsPage}>
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
                  <b>Major icons.</b> Used for things like lorem ipsum dolor et
                  amet consecteur
                </p>
              </div>
              <IconGrid>
                {majorIcons.map((icon) => (
                  <IconGrid.Item
                    key={icon.name}
                    icon={icon}
                    onClick={() => setSelectedIconName(icon.name)}
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

        <div className={styles.Sidebar}>
          {selectedIcon && (
            <div className={styles.SelectedIcon}>
              {/* <div className={styles.Preview}>
                <Image
                  src={importedSvgs(`./${selectedIcon.fileName}.svg`)}
                  alt={metadata[selectedIcon.fileName].description}
                  width={24}
                  height={24}
                />
              </div> */}

              <h2 className={styles.IconName}>
                {selectedIcon.name} <span>{selectedIcon.set}</span>
              </h2>

              {selectedIcon.description !== "N/A" && (
                <p className={styles.IconDescription}>
                  {selectedIcon.description}
                </p>
              )}

              <p className={styles.Keywords}>
                {selectedIcon.keywords
                  .filter((keyword) => keyword !== "N/A")
                  .map((keyword) => {
                    return (
                      <Button
                        type="button"
                        key={keyword}
                        onClick={() => setFilterString(`${keyword}`)}
                        small
                      >
                        {keyword}
                      </Button>
                    );
                  })}
              </p>

              <div className={styles.ActionButtons}>
                <LinkButton
                  href={
                    importedSvgs(`./${selectedIcon.fileName}.svg`).default.src
                  }
                  download
                  primary
                >
                  Download SVG
                </LinkButton>
              </div>

              <h3>Figma usage</h3>
              <p>
                Use the{" "}
                <a href="https://www.figma.com/community/file/1110993965108325096">
                  Polaris Icon Library
                </a>{" "}
                to access all icons right inside Figma.
              </p>

              <h3>React usage</h3>
              <p>
                Import the icon from{" "}
                <a href="https://www.npmjs.com/package/@shopify/polaris-icons#usage">
                  polaris-icons
                </a>
                :
              </p>

              <CodeExample title="Import" language="typescript">
                {`import {
  ${selectedIcon.name}
} from '@shopify/polaris-icons';`}
              </CodeExample>

              <p>
                Then render it using the{" "}
                <a href="https://polaris.shopify.com/components/images-and-icons/icon">
                  icon component
                </a>
                :
              </p>
              <CodeExample title="Component" language="typescript">
                {`<Icon
  source={${selectedIcon.name}}
  color="base"
/>`}
              </CodeExample>

              <a className={styles.ProposeChangeLink} href={updateURL}>
                Propose a change to this icon
              </a>
            </div>
          )}
        </div>
      </div>
    </MaxPageWidthDiv>
  );
}

export default IconsPage;
