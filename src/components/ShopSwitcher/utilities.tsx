import * as React from 'react';
import TextStyle from '../TextStyle';
import {Shop} from './types';
import * as styles from './ShopSwitcher.scss';

export function transformShopsToItems(shops: Shop[], activeIndex: number) {
  return shops.map(({name, url}, index) => ({
    content: (
      <div className={styles.ShopItem}>
        <div className={styles.ShopName}>{name}</div>
        <div className={styles.ShopUrl}>
          <TextStyle variation="subdued">{cleanUrl(url)}</TextStyle>
        </div>
      </div>
    ) as any,
    url,
    active: index === activeIndex,
    external: true,
  }));
}

export function filterShops(query: string, shops: Shop[]) {
  const lowerQuery = query.toLowerCase();
  const newShops = shops.filter(
    ({name, url}) =>
      name.toLowerCase().startsWith(lowerQuery) ||
      cleanUrl(url).startsWith(lowerQuery),
  );
  return newShops;
}

function cleanUrl(url: string) {
  try {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    return new URL(url).hostname;
  } catch {
    return url;
  }
}
