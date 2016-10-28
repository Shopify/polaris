// @flow

import React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {noop} from '../../utilities/other';

import styles from './Tablist.scss';

type Props = {
  children?: any,
  selected: boolean,
  position: number,
  onClick: (position: number) => void,
};

export default function Tab({
  children,
  position,
  onClick = noop,
  selected,
}: Props) {
  const className = classNames(
    styles.Tab,
    selected && styles.selected,
  );

  function handleClick() {
    onClick(position);
  }

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
