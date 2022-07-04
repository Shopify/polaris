import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import { className } from "../../utils/various";

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

  const handleModalClose = () => {
    const query: { q?: string } = {};
    if (searchText) query.q = searchText;
    router.push({ query });
  };

  const matchingMajorCount = Object.keys(matchingMajor).length;
  const matchingMinorCount = Object.keys(matchingMinor).length;

  const githubIssueTitle = `[polaris.shopify.com] No icon found ${searchText}`;
  const githubIssueUrl = `https://github.com/Shopify/polaris/issues/new?title=${encodeURIComponent(
    githubIssueTitle
  )}&labels=Icon`;

  return (
    <Container className={styles.IconsPage}>
      <PageMeta title={pageTitle} />

      <h1>Icons</h1>

      <div className={className(!useModal && styles.PageLayout)}>
        <div className={styles.IconGrids}>
          <SearchField
            value={searchText}
            onChange={(value) => handleSearchChange(value)}
            placeholder="Search icons"
          />

          {matchingMajorCount > 0 && (
            <IconGrid
              title="Major icons"
              icons={matchingMajor}
              activeIcon={activeIcon}
              query={searchText}
            />
          )}

          {matchingMinorCount > 0 && (
            <IconGrid
              title="Minor icons"
              icons={matchingMinor}
              activeIcon={activeIcon}
              query={searchText}
            />
          )}

          {matchingMajorCount === 0 && matchingMinorCount === 0 ? (
            <div className={styles.NoSearchResults}>
              <Image
                src="/icons/SearchMajor.svg"
                width={40}
                height={40}
                alt="A magnifying glass icon"
                icon
              />
              <div>
                <h2>No matches for {`"${searchText}"`}</h2>
                <p>
                  Open a <a href={githubIssueUrl}>GitHub issue</a> to send us
                  feedback or propose new icons.
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {useModal ? (
          <Dialog open={activeIcon !== ""} onClose={handleModalClose}>
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
    </Container>
  );
}

export default IconsPage;
