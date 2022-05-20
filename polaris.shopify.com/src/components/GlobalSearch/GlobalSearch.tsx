import { useState } from "react";
import { search } from "../../utils/search";
import {
  ComponentsSearchResult,
  GuidelinesSearchResult,
  IconsSearchResult,
  SearchResult,
  SearchResultCategory,
  SearchResults,
  TokensSearchSearchResult,
} from "../../types";
import styles from "./GlobalSearch.module.scss";
import { useCombobox } from "downshift";
import { useRouter } from "next/router";
import { WrappedTextField } from "../TextField/TextField";
import IconGrid from "../IconGrid";
import ComponentGrid from "../ComponentGrid";
import TokenList from "../TokenList";
import Link from "next/link";
import pageIcon from "./PageMajor.svg";
import { className, stripMarkdownLinks } from "../../utils/various";
import Image from "../Image";

interface Props {}

const MAX_RESULTS: { [key: string]: number } = {
  Guidelines: 5,
  Components: 4,
  Tokens: 8,
  Icons: 18,
};

function groupResults(searchResults: SearchResults) {
  const groupedResults: {
    Guidelines: { results: GuidelinesSearchResult[]; maxScore: number };
    Components: { results: ComponentsSearchResult[]; maxScore: number };
    Tokens: { results: TokensSearchSearchResult[]; maxScore: number };
    Icons: { results: IconsSearchResult[]; maxScore: number };
  } = {
    Guidelines: { results: [], maxScore: 0 },
    Components: { results: [], maxScore: 0 },
    Tokens: { results: [], maxScore: 0 },
    Icons: { results: [], maxScore: 0 },
  };

  searchResults.forEach((result) => {
    switch (result.category) {
      case "Guidelines":
        groupedResults["Guidelines"].results.push(result);
        break;

      case "Components":
        groupedResults["Components"].results.push(result);
        break;

      case "Tokens":
        groupedResults["Tokens"].results.push(result);
        break;

      case "Icons":
        groupedResults["Icons"].results.push(result);
        break;
    }
  });

  const categories: SearchResultCategory[] = [
    "Guidelines",
    "Components",
    "Tokens",
    "Icons",
  ];

  // Cap number of results. Sort by score.
  categories.forEach((category) => {
    groupedResults[category].results = groupedResults[category].results
      .slice(0, MAX_RESULTS[category])
      .sort((a, b) => a.score - b.score);
  });

  // Extract max score
  categories.forEach((category) => {
    groupedResults[category].maxScore =
      [...groupedResults[category].results].sort((a, b) => b.score - a.score)[0]
        ?.score || 0;
  });

  return groupedResults;
}

function getSearchResultAsString(result: SearchResult | null): string {
  switch (result?.category) {
    case "Guidelines":
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
  const [searchResults, setSearchResults] = useState<SearchResults>([]);
  const router = useRouter();

  const groupedResults = groupResults(searchResults);

  let resultsInRenderedOrder: SearchResults = [];
  Object.values(groupedResults).forEach((group) => {
    resultsInRenderedOrder = [...resultsInRenderedOrder, ...group.results];
  });

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    id: "global-search",
    items: resultsInRenderedOrder,
    onInputValueChange: ({ inputValue }) => {
      const results = search(inputValue || "");
      setSearchResults(results);
    },
    onSelectedItemChange: (item) => {
      const url = item.selectedItem?.url;
      if (url) {
        router.push(url);
      }
    },
    itemToString: getSearchResultAsString,
  });

  let resultIndex = -1;

  return (
    <div className={styles.GlobalSearch}>
      <label {...getLabelProps()} className="sr-only">
        Search
      </label>
      <div {...getComboboxProps()}>
        <WrappedTextField
          renderTextField={(className) => (
            <input
              {...getInputProps({})}
              placeholder="Search"
              className={className}
            />
          )}
        />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label={"toggle menu"}
          className="sr-only"
        >
          &#8595;
        </button>
      </div>
      <div {...getMenuProps({})} className={styles.Results}>
        {isOpen && (
          <>
            <div className={styles.Header}>
              <h2>Search results</h2>
              <p>Tip: Use command-K to open search</p>
            </div>
          </>
        )}

        {isOpen &&
          Object.entries(groupedResults)
            .sort(([, a], [, b]) => a.maxScore - b.maxScore)
            .map(([category]) => {
              const typedCategory = category as SearchResultCategory;

              switch (typedCategory) {
                case "Guidelines":
                  const results = groupedResults[typedCategory].results;
                  if (results.length === 0) return null;
                  return (
                    <ResultsGroup title={category}>
                      <h3>{category}</h3>
                      <div className={styles.GuidelinesResults}>
                        {results.map((result) => {
                          resultIndex++;
                          return (
                            <li
                              key={result.meta.title}
                              className={className(
                                styles.GuidelinesResult,
                                highlightedIndex === resultIndex &&
                                  styles.isHighlighted
                              )}
                            >
                              <Link href={result.url} passHref>
                                <a>
                                  <div className={styles.Icon}>
                                    <Image
                                      src={pageIcon}
                                      alt=""
                                      width={16}
                                      height={16}
                                    />
                                  </div>
                                  <h4>{result.meta.title}</h4>
                                  <p>
                                    {stripMarkdownLinks(result.meta.excerpt)}
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
                  const results = groupedResults[typedCategory].results;
                  if (results.length === 0) return null;
                  return (
                    <ResultsGroup title={category}>
                      <ComponentGrid>
                        {results.map((result) => {
                          resultIndex++;
                          return (
                            <ComponentGrid.Item
                              key={result.meta.name}
                              url={""}
                              description={result.meta.description}
                              name={result.meta.name}
                              getItemProps={() =>
                                getItemProps({
                                  item: result,
                                  index: resultIndex,
                                })
                              }
                              isHighlighted={highlightedIndex === resultIndex}
                            />
                          );
                        })}
                      </ComponentGrid>
                    </ResultsGroup>
                  );
                }

                case "Tokens": {
                  const results = groupedResults[typedCategory].results;
                  if (results.length === 0) return null;
                  return (
                    <ResultsGroup title={category}>
                      <TokenList>
                        {results.map((result) => {
                          resultIndex++;
                          return (
                            <TokenList.Item
                              key={result.meta.token.name}
                              token={result.meta.token}
                              getItemProps={() =>
                                getItemProps({
                                  item: result,
                                  index: resultIndex,
                                })
                              }
                              isHighlighted={highlightedIndex === resultIndex}
                            />
                          );
                        })}
                      </TokenList>
                    </ResultsGroup>
                  );
                }

                case "Icons": {
                  const results = groupedResults[typedCategory].results;
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
                              onClick={() => undefined}
                              getItemProps={() =>
                                getItemProps({
                                  item: result,
                                  index: resultIndex,
                                })
                              }
                              isHighlighted={highlightedIndex === resultIndex}
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
