'use client';

import Link from 'next/link';
import styles from './Icons.module.scss';
import * as PolarisIcons from '@shopify/polaris-icons';
import iconMetadata from '@shopify/polaris-icons/metadata';
import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useCopyToClipboard} from '@/hooks';
import {toPascalCase, uppercaseFirst} from '@/utils';
import Pill from '../Pill';

interface Props {}

function Icons({}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const newQuery = params?.get('q') || '';
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  }, [params]);

  return (
    <div className={styles.Icons}>
      <input
        type="search"
        value={query}
        onChange={(evt) => {
          setQuery(evt.target.value);
          router.replace('icons?q=' + evt.target.value);
        }}
        style={{border: '1px solid var(--color-border)'}}
      />

      <div className={styles.Grid}>
        {Object.values(iconMetadata)
          .filter((icon) => {
            const stringToSearch = `${icon.name}${icon.set}${
              icon.description
            }${icon.keywords.join('')}`.replace(/ /g, '');
            return stringToSearch
              .toLowerCase()
              .includes(query.toLowerCase().replace(/ /g, ''));
          })
          .map((icon) => {
            return <IconItem key={icon.id} icon={icon} />;
          })}
      </div>
    </div>
  );
}

function IconItem({icon}: {icon: typeof iconMetadata[number]}) {
  const Icon = PolarisIcons[icon.id as keyof typeof PolarisIcons];
  const [copySVGToClipbard, didJustCopySVG] = useCopyToClipboard();
  const [copyReactCodeToClipbard, didJustCopyReactCode] = useCopyToClipboard();
  const id = `${icon.name} ${icon.set}`.replace(/ /g, '-');

  function copySVG() {
    const svg = document.getElementById(id)?.querySelector('svg')?.outerHTML;
    copySVGToClipbard(svg || '');
  }

  function copyReactCode() {
    const code = `import { AddCodeMajor } from '@shopify/polaris-icons';

<Icon source={${icon.id}} color="base" />`;
    copyReactCodeToClipbard(code);
  }

  function download() {
    const svg = document.getElementById(id)?.querySelector('svg')?.outerHTML;
    if (svg) {
      const fileName = `${toPascalCase(`${icon.name} ${icon.set}`)}.svg`;
      const blob = new Blob([svg]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      link.click();
    }
  }

  return (
    <div key={icon.id} className={styles.Icon} id={id}>
      <Icon width={32} height={32} />
      <h2>
        {icon.name} <Pill label={uppercaseFirst(icon.set)} />
      </h2>
      <p>{icon.description}</p>
      <button onClick={copyReactCode}>
        {didJustCopyReactCode ? 'Copied' : 'Copy React code'}
      </button>
      <button onClick={copySVG}>
        {didJustCopySVG ? 'Copied' : 'Copy SVG'}
      </button>
      <button onClick={download}>Download</button>
    </div>
  );
}

export default Icons;
