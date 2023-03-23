'use client';

import {useEffect, useState} from 'react';
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

export default function Search() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [q, setQ] = useState<string>('');
  const [selectedSearchResult] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const debouncedQ: string = useDebounce<string>(q, 200);

  const router = useRouter();

  useEffect(() => {
    if (q.length > 0) {
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(data));
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

  return (
    <main>
      <button className={styles.Trigger} onClick={() => setIsOpen(true)}>
        Search
      </button>

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
                      <ImageRenderer image={result.thumbnail} width={200} />
                    )}
                    <div>
                      <h2>
                        {result.title} {category && <Pill label={category} />}
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
    </main>
  );
}
