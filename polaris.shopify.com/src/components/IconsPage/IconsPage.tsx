import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import iconMetadata from "@shopify/polaris-icons/metadata";
import { useMedia } from "../../utils/hooks";
import styles from "./IconsPage.module.scss";
import Container from "../Container";
import IconGrid from "../IconGrid";
import SearchField from "../SearchField";
import Image from "../Image";
import IconDetails from "../IconDetails";
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
  const useModal = useMedia("screen and (max-width: 850px)");
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
      <h1>Icons</h1>
      <div className={!useModal ? styles.SplitLayout : ""}>
        <div className={styles.IconGrids}>
          <SearchField
            value={searchText}
            onChange={(value) => handleSearchChange(value)}
            placeholder="Search icons"
          />
          {Object.keys(matchingMajor).length !== 0 && (
            <IconGrid
              title="Major icons"
              icons={matchingMajor}
              activeIcon={activeIcon}
              query={searchText}
            />
          )}
          {Object.keys(matchingMinor).length !== 0 && (
            <IconGrid
              title="Minor icons"
              icons={matchingMinor}
              activeIcon={activeIcon}
              query={searchText}
            />
          )}
          {Object.keys(matchingMajor).length === 0 &&
          Object.keys(matchingMinor).length === 0 ? (
            <div className={styles.NoSearchResults}>
              <span style={{ opacity: 0.25 }}>
                <Image
                  src="/icons/SearchMajor.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </span>
              <div>
                <h2>No icon found</h2>
                <p>
                  Open a{" "}
                  <Link
                    href={`https://github.com/Shopify/polaris/issues/new?title=[polaris.shopify.com] No icon found ${searchText}&labels=Icon`}
                  >
                    GitHub issue
                  </Link>{" "}
                  to send us feedback or propose new icons.
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <div>
          {useModal ? (
            <Dialog open={activeIcon !== ""} onClose={() => handleRemoveIcon()}>
              <div className={styles.ModalBackdrop} aria-hidden="true" />
              <Dialog.Panel className={styles.Modal}>
                <IconDetails
                  fileName={activeIcon}
                  iconData={iconMetadata[activeIcon]}
                />
              </Dialog.Panel>
            </Dialog>
          ) : (
            <IconDetails
              fileName={activeIcon}
              iconData={iconMetadata[activeIcon]}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

export default IconsPage;
