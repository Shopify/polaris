import { useState, useEffect, createContext, useContext } from "react";
import { search } from "../../utils/search";
import {
  GroupedSearchResults,
  SearchResultCategory,
  SearchResults,
} from "../../types";
import styles from "./GlobalSearch.module.scss";
import { useRouter } from "next/router";
import IconGrid from "../IconGrid";
import ComponentGrid from "../ComponentGrid";
import TokenList from "../TokenList";
import Link from "next/link";
import { stripMarkdownLinks } from "../../utils/various";
import { Dialog } from "@headlessui/react";
import { KeyboardEventHandler } from "react";

interface Props {}

const SearchContext = createContext({ id: "", currentItemId: "" });

export function useGlobalSearchResult() {
  const searchContext = useContext(SearchContext);

  if (!searchContext.id) return null;

  const { id, currentItemId } = searchContext;

  return {
    id,
    "data-is-global-search-result": true,
    "data-is-current-result": currentItemId === id,
    tabIndex: -1,
  };
}

function scrollToTop() {
  const overflowEl = document.querySelector(`.${styles.ResultsInner}`);
  if (overflowEl) {
    overflowEl.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function scrollIntoView() {
  const overflowEl = document.querySelector(`.${styles.ResultsInner}`);
  const highlightedEl = document.querySelector(
    '#search-results [data-is-current-result="true"]'
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
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const router = useRouter();

  let resultsInRenderedOrder: SearchResults = [];

  if (searchResults) {
    Object.values(searchResults)
      .sort((a, b) => a.topScore - b.topScore)
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
    setCurrentResultIndex(0);
    scrollToTop();
  }, [searchTerm]);

  useEffect(() => scrollIntoView(), [currentResultIndex]);

  useEffect(() => {
    const handler = () => setIsOpen(false);

    router.events.on("beforeHistoryChange", handler);
    router.events.on("hashChangeComplete", handler);

    return () => {
      router.events.off("beforeHistoryChange", handler);
      router.events.off("hashChangeComplete", handler);
    };
  }, [setIsOpen, router.events]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  const handleKeyboardNavigation: KeyboardEventHandler<HTMLDivElement> = (
    evt
  ) => {
    switch (evt.code) {
      case "ArrowDown":
        if (currentResultIndex < searchResultsCount - 1) {
          setCurrentResultIndex(currentResultIndex + 1);
          evt.preventDefault();
        }
        break;

      case "ArrowUp":
        if (currentResultIndex > 0) {
          setCurrentResultIndex(currentResultIndex - 1);
          evt.preventDefault();
        }
        break;

      case "Enter":
        setIsOpen(false);
        const url = resultsInRenderedOrder[currentResultIndex].url;
        router.push(url);
        break;
    }
  };

  const currentItemId = resultsInRenderedOrder[currentResultIndex]?.id || "";

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
        <div className="dark-mode">
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
                  aria-activedescendant={currentItemId}
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
              {searchResults && (
                <SearchResults
                  searchResults={searchResults}
                  currentItemId={currentItemId}
                />
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

function SearchResults({
  searchResults,
  currentItemId,
}: {
  searchResults: GroupedSearchResults;
  currentItemId: string;
}) {
  const router = useRouter();
  return (
    <>
      {Object.entries(searchResults)
        .sort((a, b) => a[1].topScore - b[1].topScore)
        .map(([category]) => {
          const typedCategory = category as SearchResultCategory;
          const results = searchResults[typedCategory].results;
          if (results.length === 0) return null;

          switch (typedCategory) {
            case "Foundations":
              return (
                <ResultsGroup title={category}>
                  <div className={styles.FoundationsResults}>
                    {results.map(({ id, url, meta }) => {
                      if (!meta.Foundations) return null;
                      const { title, excerpt } = meta.Foundations;
                      return (
                        <SearchContext.Provider
                          key={title}
                          value={{ currentItemId, id }}
                        >
                          <li className={styles.FoundationsResult}>
                            <Link href={url} passHref>
                              <a>
                                <h4>{title}</h4>
                                <p>{stripMarkdownLinks(excerpt)}</p>
                              </a>
                            </Link>
                          </li>
                        </SearchContext.Provider>
                      );
                    })}
                  </div>
                </ResultsGroup>
              );

            case "Components": {
              return (
                <ResultsGroup title={category}>
                  <ComponentGrid>
                    {results.map(({ id, url, meta }) => {
                      if (!meta.Components) return null;
                      const { name, description, status } = meta.Components;
                      return (
                        <SearchContext.Provider
                          key={id}
                          value={{ currentItemId, id }}
                        >
                          <ComponentGrid.Item
                            url={url}
                            description={description}
                            name={name}
                            status={status}
                          />
                        </SearchContext.Provider>
                      );
                    })}
                  </ComponentGrid>
                </ResultsGroup>
              );
            }

            case "Tokens": {
              return (
                <ResultsGroup title="Tokens">
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
                    {results.map(({ id, meta }) => {
                      if (!meta.Tokens) return null;
                      const { token, category } = meta.Tokens;
                      return (
                        <SearchContext.Provider
                          key={id}
                          value={{ currentItemId, id }}
                        >
                          <TokenList.Item category={category} token={token} />
                        </SearchContext.Provider>
                      );
                    })}
                  </TokenList>
                </ResultsGroup>
              );
            }

            case "Icons": {
              return (
                <ResultsGroup title={category}>
                  <IconGrid>
                    {results.map(({ id, url, meta }) => {
                      if (!meta.Icons) return null;
                      const { icon } = meta.Icons;
                      return (
                        <SearchContext.Provider
                          key={id}
                          value={{ currentItemId, id }}
                        >
                          <IconGrid.Item
                            icon={icon}
                            onClick={() => router.push(url)}
                          />
                        </SearchContext.Provider>
                      );
                    })}
                  </IconGrid>
                </ResultsGroup>
              );
            }
          }
        })}
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
