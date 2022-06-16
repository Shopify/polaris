import { useState, useEffect } from "react";
import { search } from "../../utils/search";
import {
  GroupedSearchResults,
  SearchResult,
  SearchResultCategory,
  SearchResults,
} from "../../types";
import styles from "./GlobalSearch.module.scss";
import { useRouter } from "next/router";
import { WrappedTextField } from "../TextField/TextField";
import IconGrid from "../IconGrid";
import ComponentGrid from "../ComponentGrid";
import TokenList from "../TokenList";
import Link from "next/link";
import { className, stripMarkdownLinks } from "../../utils/various";
import { Dialog } from "@headlessui/react";

interface Props {}

function getSearchResultAsString(result: SearchResult | null): string {
  switch (result?.category) {
    case "Foundations":
      return result.meta.title;
    case "Components":
      return result.meta.name;
    case "Tokens":
      return result.meta.token.name;
    case "Icons":
      return result.meta.icon.fileName;
  }
  return "";
}

function GlobalSearch({}: Props) {
  const [searchResults, setSearchResults] = useState<GroupedSearchResults>();
  const globalSearchID = "global-search";
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      const searchbar = document.getElementById(globalSearchID);
      let isSlashKey = event.key === "/";
      if (isSlashKey) {
        event.preventDefault();
        setIsOpen(true);
        if (searchbar !== null) {
          searchbar.focus();
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchResults(search(searchTerm));
  }, [searchTerm]);

  let resultsInRenderedOrder: SearchResults = [];
  if (searchResults) {
    Object.values(searchResults)
      .sort((a, b) => a.maxScore - b.maxScore)
      .forEach((group) => {
        resultsInRenderedOrder = [...resultsInRenderedOrder, ...group.results];
      });
  }

  return (
    <div className={styles.GlobalSearch}>
      <button onClick={() => setIsOpen(true)} aria-label="Search">
        <div style={{ width: 20, height: 20 }}>
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 8c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6zm17.707 10.293l-5.395-5.396A7.946 7.946 0 0016 8c0-4.411-3.589-8-8-8S0 3.589 0 8s3.589 8 8 8a7.954 7.954 0 004.897-1.688l5.396 5.395A.998.998 0 0020 19a1 1 0 00-.293-.707z"
              fill="#222"
            />
          </svg>
        </div>
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel className={styles.Results}>
          <div className={styles.Results}>
            {isOpen && (
              <>
                <div className={styles.Header}>
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(evt) => setSearchTerm(evt.target.value)}
                  />
                  <h2>{resultsInRenderedOrder.length} results</h2>
                  <p>Tip: Use / to open search</p>
                </div>
              </>
            )}

            {isOpen && (
              <div className={styles.ResultsInner}>
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
                              <h3 className={styles.ResultsGroupName}>
                                {category}
                              </h3>
                              <div className={styles.FoundationsResults}>
                                {results.map((result) => {
                                  return (
                                    <li
                                      key={result.meta.title}
                                      className={className(
                                        styles.FoundationsResult
                                      )}
                                    >
                                      <Link href={result.url} passHref>
                                        <a>
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
                                  return (
                                    <ComponentGrid.Item
                                      key={result.meta.name}
                                      url={""}
                                      description={result.meta.description}
                                      name={result.meta.name}
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
                                  return (
                                    <TokenList.Item
                                      key={result.meta.token.name}
                                      token={result.meta.token}
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
                                  return (
                                    <IconGrid.Item
                                      key={result.url}
                                      icon={result.meta.icon}
                                      onClick={() => undefined}
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
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
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
