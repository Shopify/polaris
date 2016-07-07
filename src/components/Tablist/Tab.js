// @flow

import React from 'react';
import styles from './Tablist.scss';

import {css} from '../../utilities/styles';
import {noop} from '../../utilities/other';

type Props = {
  children?: any,
  selected: boolean,
  onClick: (event: Object) => void,
};

export default function Tab(props: Props) {
  const {children, onClick} = props;

  return (
    <button
      className={classNameForTab(props)}
      onClick={onClick}
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
