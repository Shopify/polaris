import React, {PropTypes} from 'react';
import styles from './Tablist.scss';

import {css} from '../../utilities/styles';
import {noop} from '../../utilities/other';

export default function Tab(props) {
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

Tab.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

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
