import { useState } from "react";
import { Dialog } from "@headlessui/react";
import styles from "./IconsPage.module.scss";
import Container from "../Container";
import Link from "next/link";
import iconMetadata from "@shopify/polaris-icons/metadata";
import { className } from "../../utils/various";
import IconGrid from "../IconGrid";
import TextField from "../TextField";
import CodeExample from "../CodeExample";
import Image from "../Image";
import { Icon } from "../../types";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PageMeta from "../PageMeta";

const getMatchingIcons = (currentSearch: string, set: string) => {
  const matchingIcons: typeof iconMetadata = {};
  Object.keys(iconMetadata).forEach((iconName) => {
    const matchingName = iconMetadata[iconName].name
      .toLowerCase()
      .includes(currentSearch.toLowerCase());

    const matchingKeywords = iconMetadata[iconName].keywords.some((keyword) =>
      keyword.toLowerCase().includes(currentSearch.toLowerCase())
    );

    const matchingIcon = matchingName || matchingKeywords;
    const matchingSet = iconMetadata[iconName].set === set;

    if (matchingIcon && matchingSet) {
      matchingIcons[iconName] = iconMetadata[iconName];
    }
  });

  return matchingIcons;
};

function IconsPage() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const activeIcon = Array.isArray(router.query.icon)
    ? router.query.icon[0]
    : router.query.icon ?? "";

  useEffect(() => {
    setSearchText(router.query.q ? `${router.query.q}` : "");
  }, [router.query.q]);

  const matchingMinor = getMatchingIcons(searchText, "minor");
  const matchingMajor = getMatchingIcons(searchText, "major");

  const pageTitle = iconMetadata[activeIcon]
    ? `${iconMetadata[activeIcon].name} (${iconMetadata[activeIcon].set})`
    : "Icons";

  const handleSearchChange = (currentSearchText: string) => {
    setSearchText(currentSearchText);
    const query: { q?: string; icon?: string } = {};
    if (currentSearchText) query.q = currentSearchText;
    if (activeIcon) query.icon = activeIcon;
    router.push({ query });
  };

  const handleRemoveIcon = () => {
    const query: { q?: string } = {};
    if (searchText) query.q = searchText;
    router.push({ query });
  };

  return (
    <Container className={styles.IconsPage}>
      <PageMeta title={pageTitle} />

      <div className={styles.Filter}>
        <h1>Icons</h1>
      </div>

      <div className={styles.SplitLayout}>
        <div className={styles.IconGrids}>
          <div className={styles.TextField}>
            <TextField
              value={searchText}
              onChange={(value) => handleSearchChange(value)}
              placeholder="Filter icons"
            />
          </div>

          {Object.keys(matchingMajor).length !== 0 && (
            <>
              <div className={styles.SectionHeading}>
                <p>
                  <b>Major icons</b>
                </p>
              </div>
              <IconGrid>
                {Object.keys(matchingMajor).map((iconName) => (
                  <li key={iconName}>
                    <Link href={{ query: { icon: iconName, q: searchText } }}>
                      <a>
                        <IconGrid.Item
                          fileName={iconName}
                          icon={matchingMajor[iconName]}
                          isSelected={activeIcon === iconName}
                        />
                      </a>
                    </Link>
                  </li>
                ))}
              </IconGrid>
            </>
          )}

          {/*  {Object.keys(matchingMinor).length !== 0 && (
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
        )} */}
        </div>
      </div>
    </Container>
  );
}

// function SidebarContent({
//   selectedIcon,
//   setFilterString,
//   isInModal,
// }: {
//   selectedIcon: Icon;
//   setFilterString: (string: string) => void;
//   isInModal: boolean;
// }) {
//   const updateURL = `https://github.com/Shopify/polaris-icons/issues/new?assignees=@shopify/icon-guild&labels=Update,Proposal&template=propose-updates-to-existing-icons.md&title=%5BProposal%5D%20Update%20${selectedIcon.name}`;

//   return (
//     <div className={styles.Sidebar}>
//       <div className={className(styles.SidebarSection, styles.IconInfo)}>
//         <div className={styles.Preview}>
//           <div className={styles.PreviewImage}>
//             <Image
//               src={`/icons/${selectedIcon.fileName}.svg`}
//               alt={metadata[selectedIcon.fileName].description}
//               width={20}
//               height={20}
//               icon
//             />
//           </div>
//           <div className={styles.IconSet}>{selectedIcon.set}</div>
//         </div>

//         <h2 className={styles.IconName}>
//           {isInModal ? (
//             <Dialog.Title>{selectedIcon.name}</Dialog.Title>
//           ) : (
//             selectedIcon.name
//           )}
//         </h2>

//         {selectedIcon.description !== "N/A" && (
//           <p className={styles.IconDescription}>{selectedIcon.description}</p>
//         )}

//         <div className={styles.Keywords}>
//           {selectedIcon.keywords
//             .filter((keyword) => keyword !== "N/A")
//             .map((keyword) => {
//               return (
//                 <button
//                   type="button"
//                   key={keyword}
//                   onClick={() => setFilterString(`${keyword}`)}
//                 >
//                   {keyword}
//                 </button>
//               );
//             })}
//         </div>

//         <div className={styles.ActionButtons}>
//           <a
//             className={styles.DownloadIconButton}
//             href={`/icons/${selectedIcon.fileName}.svg`}
//             download
//           >
//             Download SVG
//           </a>
//         </div>
//       </div>

//       <div className={styles.SidebarSection}>
//         <h3>Figma</h3>
//         <p className={styles.SmallParagraph}>
//           Use the{" "}
//           <a href="https://www.figma.com/community/file/1110993965108325096">
//             Polaris Icon Library
//           </a>{" "}
//           to access all icons right inside Figma.
//         </p>
//       </div>

//       <div className={styles.SidebarSection}>
//         <h3>React</h3>
//         <p className={styles.SmallParagraph}>
//           Import the icon from{" "}
//           <a href="https://www.npmjs.com/package/@shopify/polaris-icons#usage">
//             polaris-icons
//           </a>
//           :
//         </p>

//         <div className={styles.CodeExampleWrapper}>
//           <CodeExample language="typescript" minimalist>
//             {`import {
//   ${selectedIcon.fileName}
// } from '@shopify/polaris-icons';`}
//           </CodeExample>
//         </div>

//         <p className={styles.SmallParagraph}>
//           Then render it using the{" "}
//           <a href="https://polaris.shopify.com/components/icon">
//             icon component
//           </a>
//           :
//         </p>

//         <div className={styles.CodeExampleWrapper}>
//           <CodeExample language="typescript" minimalist>
//             {`<Icon
//   source={${selectedIcon.fileName}}
//   color="base"
// />`}
//           </CodeExample>
//         </div>
//       </div>
//       <div className={styles.SidebarSection}>
//         <div className={styles.ProposeChange}>
//           <a href={updateURL}>Propose a change to this icon</a>
//         </div>
//       </div>
//     </div>
//   );
// }

export default IconsPage;
