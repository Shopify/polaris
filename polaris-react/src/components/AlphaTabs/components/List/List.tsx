import React from 'react';
import type {KeyboardEvent} from 'react';

import {Item} from '../Item';
import type {AlphaTabProps} from '../../types';
import styles from '../../AlphaTabs.module.scss';

export interface ListProps {
  focusIndex: number;
  disclosureTabs: AlphaTabProps[];
  onClick?(id: string): void;
  onKeyPress?(event: KeyboardEvent<HTMLElement>): void;
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

function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
  const {key} = event;

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}
