import Link from 'next/link';
import {useRouter} from 'next/router';
import navJSON from '../../../.cache/nav.json';
import {NavJSON} from '../../types';
import get from 'lodash.get';

import styles from './Breadcrumbs.module.scss';
import {deslugify} from '../../utils/various';

const nav = navJSON as NavJSON;

function Breadcrumbs() {
  const {asPath} = useRouter();
  if (asPath === '/') return null;

  const segments: {url: string; text: string}[] = [
    {
      url: '/',
      text: 'Home',
    },
  ];

  const pathChunks = asPath
    .replace(/[#\?].+$/, '')
    .slice(1)
    .split('/');

  pathChunks.forEach((chunk, i) => {
    const objectPath = `children.${pathChunks
      .slice(0, i + 1)
      .join('.children.')}`;
    const navItem = get(nav, objectPath);

    segments.push({
      url: `/${pathChunks.slice(0, i + 1).join('/')}`,
      text: navItem ? navItem.title : deslugify(chunk),
    });
  });

  return (
    <nav className={styles.Breadcrumbs} aria-label="Breadcrumb">
      <ul>
        {segments.map(({url, text}, i) => (
          <li
            key={url}
            aria-current={segments.length == i + 1 ? 'page' : 'false'}
          >
            <Link href={url}>{text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
