import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./IconsPage.module.scss";
import Container from "../Container";
import iconMetadata from "@shopify/polaris-icons/metadata";
import IconGrid from "../IconGrid";
import SearchField from "../SearchField";
import Longform from "../Longform";
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

  // This should be wired up to input type="search" clear button
  // const handleRemoveIcon = () => {
  //   const query: { q?: string } = {};
  //   if (searchText) query.q = searchText;
  //   router.push({ query });
  // };

  return (
    <Container className={styles.IconsPage}>
      <PageMeta title={pageTitle} />
      <h1>Icons</h1>
      <div className={styles.SplitLayout}>
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
            <div style={{ textAlign: "center", marginTop: "6rem" }}>
              <Longform>
                <span style={{ opacity: 0.25 }}>
                  <Image
                    src="/icons/SearchMajor.svg"
                    width={50}
                    height={50}
                    alt=""
                  />
                </span>
                <h2 style={{ marginTop: "2rem" }}>No icon found</h2>
                <p>
                  Open a{" "}
                  <Link
                    href={`https://github.com/Shopify/polaris/issues/new?title=[polaris.shopify.com] No icon found ${searchText}&labels=Icon`}
                  >
                    GitHub issue
                  </Link>{" "}
                  to send us feedback or propose new icons.
                </p>
              </Longform>
            </div>
          ) : null}
        </div>
        <div>
          <div className={styles.SidebarCard}>
            {iconMetadata[activeIcon] ? (
              <IconDetails
                fileName={activeIcon}
                name={iconMetadata[activeIcon].name}
                set={iconMetadata[activeIcon].set}
                description={iconMetadata[activeIcon].description}
                keywords={iconMetadata[activeIcon].keywords}
                query={searchText}
              />
            ) : (
              <div className={styles.SidebarEmptyState}>
                <p>Select an icon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default IconsPage;
