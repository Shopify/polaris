import { useState, useEffect } from "react";
import { search } from "../../utils/search";
import {
  GroupedSearchResults,
  SearchResultCategory,
  SearchResultItem,
  SearchResults,
} from "../../types";
import styles from "./GlobalSearch.module.scss";
import { useRouter } from "next/router";
import IconGrid from "../IconGrid";
import ComponentGrid from "../ComponentGrid";
import TokenList from "../TokenList";
import Link from "next/link";
import { className, slugify, stripMarkdownLinks } from "../../utils/various";
import { Dialog } from "@headlessui/react";
import { KeyboardEventHandler } from "react";
import ThemeProvider from "../ThemeProvider";

interface Props {}

function scrollToTop() {
  const overflowEl = document.querySelector(`.${styles.ResultsInner}`);
  if (overflowEl) {
    overflowEl.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function scrollIntoView() {
  const overflowEl = document.querySelector(`.${styles.ResultsInner}`);
  const highlightedEl = document.querySelector(
    '#search-results [data-is-active-descendant="true"]'
  );

  if (overflowEl && highlightedEl) {
    const overflowElBounds = overflowEl.getBoundingClientRect();
    const highlightedElBounds = highlightedEl.getBoundingClientRect();

    const isCloseToTop = highlightedElBounds.top - overflowElBounds.top < 100;
    const isCloseToBottom =
      highlightedElBounds.top + highlightedElBounds.height >
      overflowElBounds.top + overflowElBounds.height - 100;

    if (isCloseToTop || isCloseToBottom) {
      highlightedEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }
}

function GlobalSearch({}: Props) {
  const [searchResults, setSearchResults] = useState<GroupedSearchResults>();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDescendant, setActiveDescendant] = useState(0);
  const router = useRouter();

  let resultsInRenderedOrder: SearchResults = [];

  if (searchResults) {
    Object.values(searchResults)
      .sort((a, b) => a.maxScore - b.maxScore)
      .forEach((group) => {
        resultsInRenderedOrder = [...resultsInRenderedOrder, ...group.results];
      });
  }

  const searchResultsCount = resultsInRenderedOrder.length;

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      let isSlashKey = event.key === "/";
      if (isSlashKey) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    setSearchResults(search(searchTerm));
    setActiveDescendant(0);
    scrollToTop();
  }, [searchTerm]);

  useEffect(() => scrollIntoView(), [activeDescendant]);

  useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    };
    router.events.on("beforeHistoryChange", handler);
    router.events.on("hashChangeComplete", handler);

    return () => {
      router.events.off("beforeHistoryChange", handler);
      router.events.off("hashChangeComplete", handler);
    };
  }, [setIsOpen, router.events]);

  const handleKeyboardNavigation: KeyboardEventHandler<HTMLDivElement> = (
    evt
  ) => {
    switch (evt.code) {
      case "ArrowDown":
        if (activeDescendant < searchResultsCount - 1) {
          setActiveDescendant(activeDescendant + 1);
          evt.preventDefault();
        }
        break;

      case "ArrowUp":
        if (activeDescendant > 0) {
          setActiveDescendant(activeDescendant - 1);
          evt.preventDefault();
        }
        break;

      case "Enter":
        setIsOpen(false);
        const url = resultsInRenderedOrder[activeDescendant].url;
        router.push(url);
        break;
    }
  };

  const getItemId = (resultIndex: number): string => {
    return `result${slugify(resultsInRenderedOrder[resultIndex].url)}`;
  };

  const getItemProps = ({
    resultIndex,
  }: {
    resultIndex: number;
  }): SearchResultItem => {
    const isHighlighted = resultIndex === activeDescendant;
    return {
      searchResultData: {
        isHighlighted,
        itemAttributes: {
          id: getItemId(resultIndex),
          "data-is-active-descendant": isHighlighted,
        },
        tabIndex: -1,
        url: resultsInRenderedOrder[resultIndex].url,
      },
    };
  };

  let resultIndex = -1;

  return (
    <>
      <button
        className={styles.ToggleButton}
        onClick={() => setIsOpen(true)}
        aria-label="Search"
      >
        <SearchIcon />
        Search <span className={styles.KeyboardShortcutHint}>/</span>
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.ModalBackdrop}></div>
        <ThemeProvider theme="dark">
          <>
            <Dialog.Panel className={styles.Results}>
              {isOpen && (
                <div className={styles.Header}>
                  <div className={styles.SearchIcon}>
                    <SearchIcon />
                  </div>

                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(evt) => setSearchTerm(evt.target.value)}
                    role="combobox"
                    aria-controls="search-results"
                    aria-expanded={searchResultsCount > 0}
                    aria-activedescendant={
                      searchResultsCount > 0
                        ? getItemId(activeDescendant)
                        : undefined
                    }
                    onKeyDown={handleKeyboardNavigation}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder="Search"
                  />
                  <button
                    className={styles.MobileCloseButton}
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              )}
              <div
                className={styles.ResultsInner}
                id="search-results"
                role="listbox"
                aria-label="Search results"
              >
                {searchResults &&
                  Object.entries(searchResults)
                    .sort((a, b) => a[1].maxScore - b[1].maxScore)
                    .map(([category]) => {
                      const typedCategory = category as SearchResultCategory;

                      switch (typedCategory) {
                        case "Foundations":
                          const results = searchResults[typedCategory].results;
                          if (results.length === 0) return null;
                          return (
                            <ResultsGroup title={category}>
                              <div className={styles.FoundationsResults}>
                                {results.map((result) => {
                                  resultIndex++;
                                  const { searchResultData } = getItemProps({
                                    resultIndex,
                                  });
                                  return (
                                    <li
                                      key={result.meta.title}
                                      className={className(
                                        styles.FoundationsResult,
                                        searchResultData?.isHighlighted &&
                                          styles.isHighlighted
                                      )}
                                      {...searchResultData?.itemAttributes}
                                    >
                                      <Link href={result.url} passHref>
                                        <a
                                          tabIndex={searchResultData?.tabIndex}
                                        >
                                          <h4>{result.meta.title}</h4>
                                          <p>
                                            {stripMarkdownLinks(
                                              result.meta.excerpt
                                            )}
                                          </p>
                                        </a>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </div>
                            </ResultsGroup>
                          );

                        case "Components": {
                          const results = searchResults[typedCategory].results;
                          if (results.length === 0) return null;
                          return (
                            <ResultsGroup title={category}>
                              <ComponentGrid>
                                {results.map((result) => {
                                  resultIndex++;
                                  return (
                                    <ComponentGrid.Item
                                      key={result.meta.name}
                                      url={result.url}
                                      description={result.meta.description}
                                      name={result.meta.name}
                                      {...getItemProps({ resultIndex })}
                                    />
                                  );
                                })}
                              </ComponentGrid>
                            </ResultsGroup>
                          );
                        }

                        case "Tokens": {
                          const results = searchResults[typedCategory].results;
                          if (results.length === 0) return null;
                          return (
                            <ResultsGroup title={category}>
                              <TokenList
                                showTableHeading={false}
                                columns={{
                                  preview: true,
                                  name: true,
                                  figmaUsage: false,
                                  value: false,
                                  description: true,
                                }}
                              >
                                {results.map((result) => {
                                  resultIndex++;
                                  return (
                                    <TokenList.Item
                                      key={result.meta.token.name}
                                      token={result.meta.token}
                                      {...getItemProps({ resultIndex })}
                                    />
                                  );
                                })}
                              </TokenList>
                            </ResultsGroup>
                          );
                        }

                        case "Icons": {
                          const results = searchResults[typedCategory].results;
                          if (results.length === 0) return null;
                          return (
                            <ResultsGroup title={category}>
                              <IconGrid>
                                {results.map((result) => {
                                  resultIndex++;
                                  return (
                                    <IconGrid.Item
                                      key={result.url}
                                      icon={result.meta.icon}
                                      onClick={() => router.push(result.url)}
                                      {...getItemProps({ resultIndex })}
                                    />
                                  );
                                })}
                              </IconGrid>
                            </ResultsGroup>
                          );
                        }
                      }
                    })}
              </div>
            </Dialog.Panel>
          </>
        </ThemeProvider>
      </Dialog>
    </>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 8c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6zm17.707 10.293l-5.395-5.396A7.946 7.946 0 0016 8c0-4.411-3.589-8-8-8S0 3.589 0 8s3.589 8 8 8a7.954 7.954 0 004.897-1.688l5.396 5.395A.998.998 0 0020 19a1 1 0 00-.293-.707z"
        fill="currentColor"
      />
    </svg>
  );
}

function ResultsGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.ResultsGroup}>
      <h3 className={styles.ResultsGroupName}>{title}</h3>
      {children}
    </div>
  );
}

export default GlobalSearch;
