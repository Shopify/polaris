// @flow

import React from 'react';

import styles from './List.scss';
import {noop} from '../../utilities/other';

type Props = {
  items: string[],
  onItemSelect?: (item: string) => void,
};

export default function List({items, onItemSelect}: Props) {
  return (
    <ul className={styles.List}>
      {items.map((item) => (
        <ListItem key={item} onSelect={onItemSelect}>{item}</ListItem>
      ))}
    </ul>
  );
}

type ListItemProps = {
  children: string,
  onSelect?: (item: string) => void,
};

function ListItem({children, onSelect}: ListItemProps) {
  const onClick = onSelect ? onSelect.bind(null, children) : noop;

  return (
    <li className={styles.ListItem} onClick={onClick}>
      {children}
    </li>
  );
}
