import React from 'react';

import {Item} from '../Item';
import type {TabDescriptor} from '../../types';
import styles from '../../Tabs.scss';

export interface ListProps {
  focusIndex: number;
  disclosureTabs: TabDescriptor[];
  onClick?(id: string): void;
  onKeyPress?(event: React.KeyboardEvent<HTMLElement>): void;
}

export function List({
  focusIndex,
  disclosureTabs,
  onClick = noop,
  onKeyPress = noop,
}: ListProps) {
  const tabs = disclosureTabs.map(({id, content, ...tabProps}, index) => {
    return (
      <Item
        key={id}
        {...tabProps}
        id={id}
        focused={index === focusIndex}
        onClick={onClick.bind(null, id)}
      >
        {content}
      </Item>
    );
  });

  return (
    <ul className={styles.List} onKeyDown={handleKeyDown} onKeyUp={onKeyPress}>
      {tabs}
    </ul>
  );
}

function noop() {}

function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
  const {key} = event;

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}
