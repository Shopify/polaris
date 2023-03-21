import {useState, useEffect, createContext, useContext} from 'react';
import {
  GroupedSearchResults,
  SearchResult,
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
import {Monorail} from '@shopify/monorail';
import {v4 as uuidv4} from 'uuid';
import {
  PolarisDocsSearchClick_1_0,
  PolarisDocsSearchQuery_1_0,
} from '@shopify/monorail/lib/schemas';

type MonorailEventHandleMap = {
  // TODO swap these out as soon as the polaris events are released
  searchClick: PolarisDocsSearchClick_1_0['schemaId'];
  searchQuery: PolarisDocsSearchQuery_1_0['schemaId'];
};

type MonorailEventHandles = keyof MonorailEventHandleMap;

const schemas: MonorailEventHandleMap = {
  searchClick: 'polaris_docs_search_click/1.0',
  searchQuery: 'polaris_docs_search_query/1.0',
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

const monorail =
  process.env.NODE_ENV === 'production'
    ? Monorail.createHttpProducer({production: true})
    : Monorail.createLogProducer({
        debugMode: true, // we may not want to log these in staging
      });

const monorailEvent = (event: MonorailEventHandles, monorailFields: any) => {
  return monorail.produce({
    schemaId: schemas[event],
    payload: {...monorailFields, locale: document.documentElement.lang},
  });
};

function captureSearchClick(
  uuid: string,
  searchTerm: string,
  resultRank: number,
  gid: string,
  selectedResult: string,
) {
  // if we don't meet the minimum search query length, bail
  if (searchTerm.length < 3) return;

  const monorailFields = {
    search_uuid: uuid,
    query: searchTerm,
    locale: document.documentElement.lang,
    gid,
    url: selectedResult,
    rank: resultRank,
  };

  monorailEvent('searchClick', monorailFields);
}

function captureSearchQuery(
  uuid: string,
  searchTerm: string,
  results: SearchResults,
) {
  if (searchTerm.length < 3) return;

  const monorailFields: any = {
    uuid,
    query: searchTerm,
  };

  results?.slice(0, 10).forEach((result: SearchResult, index: number) => {
    monorailFields[`gid${index}`] = result.id;
    monorailFields[`url${index}`] = result.url;
  });

  monorailEvent('searchQuery', monorailFields);
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
  const [uuid, setUuid] = useState('');
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

    captureSearchQuery(uuid, searchTerm, resultsInRenderedOrder);
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
      setUuid('');
    } else {
      setUuid(uuidv4());
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
                  uuid={uuid}
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
  uuid,
}: {
  searchResults: GroupedSearchResults;
  currentItemId: string;
  searchTerm?: string;
  resultsInRenderedOrder: SearchResults;
  uuid: string;
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
                            captureSearchClick(uuid, searchTerm, rank, id, url)
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
                            captureSearchClick(uuid, searchTerm, rank, id, url)
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
                            captureSearchClick(uuid, searchTerm, rank, id, url)
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
                          uuid={uuid}
                          customOnClick={captureSearchClick}
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
                          uuid={uuid}
                          customOnClick={captureSearchClick}
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
