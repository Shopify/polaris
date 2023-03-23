'use client';

import styles from './Icons.module.scss';
import * as PolarisIcons from '@shopify/polaris-icons';
import iconMetadata from '@shopify/polaris-icons/metadata';
import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useCopyToClipboard} from '@/hooks';
import {toPascalCase, uppercaseFirst} from '@/utils';
import Pill from '../Pill';
import Button from '../Button';
import {ButtonGroup} from '../Button/Button';

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
  const [copySVGToClipbard, didJustCopySVG] = useCopyToClipboard();
  const [copyReactCodeToClipbard, didJustCopyReactCode] = useCopyToClipboard();
  const [didJustDownload, setDidJustDownload] = useState(false);

  const Icon = PolarisIcons[icon.id as keyof typeof PolarisIcons];
  const id = `${icon.name} ${icon.set}`.replace(/ /g, '-');

  useEffect(() => {
    if (didJustDownload) {
      const timeout = setTimeout(() => {
        setDidJustDownload(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [didJustDownload]);

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
    setDidJustDownload(true);
    const svg = document.getElementById(id)?.querySelector('svg');

    if (svg) {
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      const svgString = svg.outerHTML;
      const fileName = `${toPascalCase(`${icon.name} ${icon.set}`)}.svg`;
      const blob = new Blob([svgString]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      link.click();
    }
  }

  return (
    <div key={icon.id} className={styles.Icon} id={id}>
      <div className={styles.IconWrapper}>
        <Icon width={32} height={32} />
      </div>
      <h2>
        {icon.name} <Pill label={uppercaseFirst(icon.set)} />
      </h2>
      <p>{icon.description}</p>
      <ButtonGroup>
        <Button
          onClick={copyReactCode}
          label="React"
          ariaLabel="Copy React code"
          didJustCopy={didJustCopyReactCode}
          icon="copy"
        ></Button>
        <Button
          onClick={copySVG}
          label="SVG"
          ariaLabel="Copy SVG"
          didJustCopy={didJustCopySVG}
          icon="copy"
        />
        <Button
          onClick={download}
          label=""
          ariaLabel="Download"
          didJustDownload={didJustDownload}
          icon="download"
        />
      </ButtonGroup>
    </div>
  );
}

export default Icons;
