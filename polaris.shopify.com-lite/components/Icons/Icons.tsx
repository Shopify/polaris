'use client';

import Link from 'next/link';
import styles from './Icons.module.scss';
import * as PolarisIcons from '@shopify/polaris-icons';
import iconMetadata from '@shopify/polaris-icons/metadata';
import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

interface Props {}

function Icons({}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuery = params.get('q');
  const [query, setQuery] = useState(initialQuery || '');

  useEffect(() => {
    if (query.length > 0) {
      router.replace('icons?q=' + query);
    } else {
      router.replace('icons');
    }
  }, [query]);

  return (
    <div className={styles.Icons}>
      <input
        type="search"
        value={query}
        onChange={(evt) => setQuery(evt.target.value)}
      />

      <div className={styles.Grid}>
        {Object.values(iconMetadata)
          .filter((icon) => {
            const stringToSearch = `${icon.name} ${
              icon.description
            } ${icon.keywords.join(' ')}`;
            return stringToSearch.toLowerCase().includes(query.toLowerCase());
          })
          .map((icon) => {
            const Icon = PolarisIcons[icon.id as keyof typeof PolarisIcons];
            return (
              <div key={icon.id} className={styles.Icon}>
                <Icon width={32} height={32} />
                <p>
                  {icon.name} — {icon.set}
                </p>
                <p>
                  {icon.description} {icon.keywords.join(', ')}
                </p>
                <button>Copy code</button>
                <button>Copy SVG</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Icons;
