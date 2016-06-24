import React, {PropTypes} from 'react';
import styles from './Label.scss';

import {css} from '../../utilities/styles';

export default function Label(props) {
  const {children, note, id, action} = props;

  return (
    <div className={styles.LabelWrapper}>
      <label htmlFor={id} className={classNameForLabel(props)}>{children} {note}</label>
      {action}
    </div>
  );
}

Label.propTypes = {
  children: PropTypes.string,
  id: PropTypes.string.isRequired,
  error: PropTypes.bool,
  note: PropTypes.string,
  action: PropTypes.node,
};

Label.defaultProps = {
  error: false,
};

function classNameForLabel({error}) {
  return css([
    styles.Label,
    error && styles.error,
  ]);
}
