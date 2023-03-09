import {useState, useEffect, createContext, useContext} from 'react';
import {
  GroupedSearchResults,
  SearchResultCategory,
  SearchResults,
} from '../../types';
import {useThrottle} from '../../utils/hooks';
import styles from './GlobalSearch.module.scss';
import {useRouter} from 'next/router';
import IconGrid from '../IconGrid';
import {Grid, GridItem} from '../Grid';
import TokenList from '../TokenList';
import {Dialog} from '@headlessui/react';
import {KeyboardEventHandler} from 'react';
import FoundationsThumbnail from '../FoundationsThumbnail';
import PatternThumbnailPreview from '../ThumbnailPreview';
import ComponentThumbnail from '../ComponentThumbnail';
const CATEGORY_NAMES: {[key in SearchResultCategory]: string} = {
  components: 'Components',
  foundations: 'Foundations',
  patterns: 'Patterns',
  tokens: 'Tokens',
  icons: 'Icons',
};

const SearchContext = createContext({id: '', currentItemId: ''});

export function useGlobalSearchResult() {
  const searchContext = useContext(SearchContext);
  if (!searchContext.id) return null;
  const {id, currentItemId} = searchContext;

  return {
    id,
    'data-is-global-search-result': true,
    'data-is-current-result': currentItemId === id,
    tabIndex: -1,
  };
}

function scrollToTop() {
  const overflowEl = document.querySelector(`.${styles.ResultsInner}`);
  overflowEl?.scrollTo({top: 0, behavior: 'smooth'});
}

function captureSearchEvent(
  searchTerm: string,
  resultRank: number,
  selectedResult?: string,
) {
  const eventParams = {
    searchTerm,
    resultRank,
    selectedResult,
    category: 'engagement',
  };

  if (searchTerm) {
    window.gtag('event', 'customSearch', eventParams);
  }
}

function scrollIntoView() {
  const overflowEl = document.querySelector(`.${styles.ResultsInner}`);
  const highlightedEl = document.querySelector(
    '#search-results [data-is-current-result="true"]',
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
        behavior: 'smooth',
        block: 'center',
      });
    }
  }
}

function GlobalSearch() {
  const [searchResults, setSearchResults] = useState<GroupedSearchResults>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const router = useRouter();

  let resultsInRenderedOrder: SearchResults = [];

  searchResults.forEach((group) => {
    resultsInRenderedOrder = [...resultsInRenderedOrder, ...group.results];
  });

  const searchResultsCount = resultsInRenderedOrder.length;

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      let isSlashKey = event.key === '/';
      if (isSlashKey) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, []);

  const throttledSearch = useThrottle(() => {
    fetch(`/api/search/v0?q=${encodeURIComponent(searchTerm)}`)
      .then((data) => data.json())
      .then((json) => {
        const {results} = json;
        setSearchResults(results);
      });

    setCurrentResultIndex(0);
    scrollToTop();
  }, 400);

  useEffect(throttledSearch, [searchTerm, throttledSearch]);

  useEffect(() => scrollIntoView(), [currentResultIndex]);

  useEffect(() => {
    const handler = () => setIsOpen(false);

    router.events.on('beforeHistoryChange', handler);
    router.events.on('hashChangeComplete', handler);

    return () => {
      router.events.off('beforeHistoryChange', handler);
      router.events.off('hashChangeComplete', handler);
    };
  }, [setIsOpen, router.events]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const handleKeyboardNavigation: KeyboardEventHandler<HTMLDivElement> = (
    evt,
  ) => {
    switch (evt.code) {
      case 'ArrowDown':
        if (currentResultIndex < searchResultsCount - 1) {
          setCurrentResultIndex(currentResultIndex + 1);
          evt.preventDefault();
        }
        break;

      case 'ArrowUp':
        if (currentResultIndex > 0) {
          setCurrentResultIndex(currentResultIndex - 1);
          evt.preventDefault();
        }
        break;

      case 'Enter':
        if (resultsInRenderedOrder.length > 0) {
          setIsOpen(false);
          const url = resultsInRenderedOrder[currentResultIndex].url;
          captureSearchEvent(searchTerm, currentResultIndex + 1, url);
          router.push(url);
        }
        break;
    }
  };

  const currentItemId = resultsInRenderedOrder[currentResultIndex]?.id || '';

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

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          // on close we want to capture that no search result was selected
          captureSearchEvent(searchTerm, 0);
        }}
      >
        <div className={styles.PreventBackgroundInteractions}></div>
        <div className="dark-mode styles-for-site-but-not-polaris-examples">
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
                  onKeyUp={handleKeyboardNavigation}
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
                  searchTerm={searchTerm}
                  resultsInRenderedOrder={resultsInRenderedOrder}
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
  searchTerm,
  resultsInRenderedOrder,
}: {
  searchResults: GroupedSearchResults;
  currentItemId: string;
  searchTerm?: string;
  resultsInRenderedOrder: SearchResults;
}) {
  return (
    <>
      {searchResults.map(({category, results}) => {
        if (results.length === 0) return null;
        switch (category) {
          case 'foundations':
            return (
              <ResultsGroup category={category} key={category}>
                <Grid>
                  {results.map(({id, url, meta}) => {
                    if (!meta.foundations) return null;
                    const {title, description, icon, category} =
                      meta.foundations;
                    const resultIndex = resultsInRenderedOrder.findIndex(
                      (r) => {
                        return r.id === id;
                      },
                    );
                    const rank = resultIndex + 1; // zero-indexed
                    return (
                      <SearchContext.Provider
                        key={title}
                        value={{currentItemId, id}}
                      >
                        <GridItem
                          title={title}
                          description={description}
                          url={url}
                          customOnClick={() =>
                            searchTerm &&
                            captureSearchEvent(searchTerm, rank, url)
                          }
                          renderPreview={() => (
                            <FoundationsThumbnail
                              icon={icon}
                              category={category}
                            />
                          )}
                        />
                      </SearchContext.Provider>
                    );
                  })}
                </Grid>
              </ResultsGroup>
            );

          case 'patterns': {
            return (
              <ResultsGroup category={category} key={category}>
                <Grid>
                  {results.map(({id, url, meta}) => {
                    if (!meta.patterns) return null;
                    const {title, description, previewImg} = meta.patterns;
                    const resultIndex = resultsInRenderedOrder.findIndex(
                      (r) => {
                        return r.id === id;
                      },
                    );
                    const rank = resultIndex + 1;
                    return (
                      <SearchContext.Provider
                        key={id}
                        value={{currentItemId, id}}
                      >
                        <GridItem
                          url={url}
                          description={description}
                          title={title}
                          customOnClick={() =>
                            searchTerm &&
                            captureSearchEvent(searchTerm, rank, url)
                          }
                          renderPreview={() => (
                            <PatternThumbnailPreview
                              alt={title}
                              src={previewImg}
                            />
                          )}
                        />
                      </SearchContext.Provider>
                    );
                  })}
                </Grid>
              </ResultsGroup>
            );
          }

          case 'components': {
            return (
              <ResultsGroup category={category} key={category}>
                <Grid>
                  {results.map(({id, url, meta}) => {
                    if (!meta.components) return null;
                    const {title, description, status, group} = meta.components;
                    const resultIndex = resultsInRenderedOrder.findIndex(
                      (r) => {
                        return r.id === id;
                      },
                    );
                    const rank = resultIndex + 1;
                    return (
                      <SearchContext.Provider
                        key={id}
                        value={{currentItemId, id}}
                      >
                        <GridItem
                          url={url}
                          description={description}
                          title={title}
                          status={status}
                          customOnClick={() =>
                            searchTerm &&
                            captureSearchEvent(searchTerm, rank, url)
                          }
                          renderPreview={() => (
                            <ComponentThumbnail title={title} group={group} />
                          )}
                        />
                      </SearchContext.Provider>
                    );
                  })}
                </Grid>
              </ResultsGroup>
            );
          }

          case 'tokens': {
            return (
              <ResultsGroup category={category} key={category}>
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
                  {results.map(({id, meta}) => {
                    if (!meta.tokens) return null;
                    const {token, category} = meta.tokens;
                    const resultIndex = resultsInRenderedOrder.findIndex(
                      (r) => {
                        return r.id === id;
                      },
                    );
                    const rank = resultIndex + 1;
                    return (
                      <SearchContext.Provider
                        key={id}
                        value={{currentItemId, id}}
                      >
                        <TokenList.Item
                          category={category}
                          token={token}
                          customOnClick={captureSearchEvent}
                          searchTerm={searchTerm}
                          rank={rank}
                        />
                      </SearchContext.Provider>
                    );
                  })}
                </TokenList>
              </ResultsGroup>
            );
          }

          case 'icons': {
            return (
              <ResultsGroup category={category} key={category}>
                <IconGrid>
                  {results.map(({id, meta}) => {
                    if (!meta.icons) return null;
                    const {icon} = meta.icons;
                    const resultIndex = resultsInRenderedOrder.findIndex(
                      (r) => {
                        return r.id === id;
                      },
                    );
                    const rank = resultIndex + 1;
                    return (
                      <SearchContext.Provider
                        key={id}
                        value={{currentItemId, id}}
                      >
                        <IconGrid.Item
                          icon={icon}
                          customOnClick={captureSearchEvent}
                          searchTerm={searchTerm}
                          rank={rank}
                        />
                      </SearchContext.Provider>
                    );
                  })}
                </IconGrid>
              </ResultsGroup>
            );
          }

          default:
            return [];
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
  category,
  children,
}: {
  category: SearchResultCategory;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.ResultsGroup}>
      <h3 className={styles.ResultsGroupName}>{CATEGORY_NAMES[category]}</h3>
      {children}
    </div>
  );
}

export default GlobalSearch;
