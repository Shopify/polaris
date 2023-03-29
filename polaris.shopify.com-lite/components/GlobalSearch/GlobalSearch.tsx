import {useEffect, useRef, useState} from 'react';
import {SearchResult} from '@/app/api/search/route';
import {Combobox, Dialog} from '@headlessui/react';
import {useRouter, useSearchParams} from 'next/navigation';
import styles from './GlobalSearch.module.scss';
import Link from 'next/link';
import Markdown from '../Markdown';
import * as PolarisIcons from '@shopify/polaris-icons';
import {className, toPascalCase, uppercaseFirst} from '@/utils';
import {useDebounce} from '@/hooks';
import ImageRenderer from '../ImageRenderer';
import Pill from '../Pill';

interface Props {
  renderToggle: (attributes: {onClick: () => void}) => React.ReactNode;
}

export default function GlobalSearch({renderToggle}: Props) {
  const [isFetching, setIsFetching] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [q, setQ] = useState<string>('');
  const [selectedSearchResult] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const debouncedQ: string = useDebounce<string>(q, 150);
  const controller = useRef<AbortController>();

  const router = useRouter();

  useEffect(() => {
    if (controller.current?.signal) {
      controller.current.abort();
    }
    controller.current = new AbortController();

    if (q.trim().length > 0) {
      setIsFetching(true);
      fetch(`/api/search?q=${encodeURIComponent(q)}`, {
        signal: controller.current.signal,
      })
        .then((res) => res.json())
        .then((data) => setSearchResults(data))
        .catch((error) => {
          if (error.name !== 'AbortError') {
            throw new Error(error);
          }
          setIsFetching(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [debouncedQ]);

  useEffect(() => {
    function handler(evt: KeyboardEvent) {
      if (evt.key === '/' && !isOpen) {
        setIsOpen(true);
        evt.preventDefault();
      }
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const triggerAttributes = {
    onClick: () => setIsOpen(true),
  };

  return (
    <>
      {renderToggle(triggerAttributes)}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel className={className(styles.Dialog, 'dark-morde')}>
          <Combobox
            value={selectedSearchResult}
            onChange={(id) => {
              const result = searchResults.find((result) => result.id === id);
              if (result) {
                router.push(`${result.url}${result.urlAppendix}`);
                setIsOpen(false);
              }
            }}
          >
            <Combobox.Input
              className={styles.Input}
              onChange={(event) => setQ(event.target.value)}
              autoComplete="off"
              spellCheck="false"
              placeholder="Search"
            />
            <button
              className={styles.CloseButton}
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>

            {q.trim().length > 0 &&
              searchResults.length === 0 &&
              !isFetching && (
                <div className={styles.EmptyState}>No results</div>
              )}
            {q.trim().length === 0 && searchResults.length === 0 && (
              <div className={styles.EmptyState}>
                Find guidance, patterns, tokens, components, tokens...
              </div>
            )}

            <Combobox.Options className={styles.Results}>
              {searchResults.map((result) => {
                const category =
                  result.url.length > 0 &&
                  uppercaseFirst(result.url.split('/')[0]).replace(/s$/g, '');
                const Icon =
                  PolarisIcons[
                    toPascalCase(result.title) as keyof typeof PolarisIcons
                  ];

                return (
                  <Combobox.Option
                    key={result.id}
                    value={result.id}
                    className={styles.Result}
                  >
                    {Icon && (
                      <div className={styles.Preview}>
                        <Icon width={32} height={32} />
                      </div>
                    )}
                    {result.thumbnail && (
                      <ImageRenderer
                        className={styles.Preview}
                        image={result.thumbnail}
                        width={400}
                      />
                    )}
                    <div className={styles.Text}>
                      <h2>
                        {category && <Pill label={category} asIcon />}
                        {result.title}{' '}
                      </h2>
                      <Markdown strip>{result.excerpt}</Markdown>
                      <p className={styles.Url}>/{result.url}</p>
                    </div>
                  </Combobox.Option>
                );
              })}
            </Combobox.Options>
          </Combobox>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
