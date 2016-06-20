import React, {PropTypes} from 'react';
import styles from './index.css';

export default function Label(props) {
  const {children, note} = props;

  return (
    <label htmlFor="name" className={classNameForLabel(props)}>{children} {note}</label>
  );
}

Label.propTypes = {
  children: PropTypes.string,
  note: PropTypes.string,
};

function classNameForLabel() {
  return styles.Label;
}
