// @flow

import React from 'react';

import {css} from '../../utilities/styles';
import {noop} from '../../utilities/other';

import styles from './Tablist.scss';

type Props = {
  children?: any,
  selected: boolean,
  position: number,
  onClick: (position: number) => void,
};

export default function Tab(props: Props) {
  const {children, position, onClick} = props;

  function handleClick() {
    onClick(position);
  }

  return (
    <button
      className={classNameForTab(props)}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

Tab.defaultProps = {
  selected: false,
  onClick: noop,
};

function classNameForTab({selected}) {
  return css([
    styles.Tab,
    selected && styles.selected,
  ]);
}
