'use client';

import {useEffect, useState} from 'react';
import {SearchResult} from '@/app/api/search/route';
import {Combobox, Dialog} from '@headlessui/react';
import {useRouter, useSearchParams} from 'next/navigation';
import styles from './GlobalSearch.module.scss';
import Link from 'next/link';
import Markdown from '../Markdown';
import * as PolarisIcons from '@shopify/polaris-icons';
import {toPascalCase} from '@/utils';
import {useDebounce} from '@/hooks';

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
        <Dialog.Panel className={styles.Dialog}>
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
                const category = result.url.split('/')[0];
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
                    <div>
                      <h2>
                        {result.title}{' '}
                        <span
                          style={{
                            padding: 4,
                            background: '#444',
                            borderRadius: 8,
                          }}
                        >
                          {category}
                        </span>
                      </h2>
                      <Markdown>{result.excerpt}</Markdown>
                      <p>{result.url}</p>
                      {result.thumbnail && (
                        <p>{JSON.stringify(result.thumbnail)}</p>
                      )}
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
