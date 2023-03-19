'use client';

import {useEffect, useState} from 'react';
import {SearchResult} from '@/app/api/search/route';
import {Combobox, Dialog} from '@headlessui/react';
import {useRouter} from 'next/navigation';
import styles from './GlobalSearch.module.scss';
import Link from 'next/link';

export default function Search() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [q, setQ] = useState<string>('');
  const [selectedSearchResult, setSelectedSearchResult] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (q.length > 0) {
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(data));
    } else {
      setSearchResults([]);
    }
  }, [q]);

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
                router.push(`${result.url}`);
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
              {searchResults.map((result) => (
                <Combobox.Option
                  key={result.id}
                  value={result.id}
                  className={styles.Result}
                >
                  <h2>{result.title}</h2>
                  <p>{result.excerpt}</p>
                  <p>{result.url}</p>
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
        </Dialog.Panel>
      </Dialog>
    </main>
  );
}
