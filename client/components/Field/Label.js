import React, {PropTypes} from 'react';
import styles from './index.css';

export default function Label(props) {
  const {children, note, htmlFor} = props;

  return (
    <label htmlFor={htmlFor} className={classNameForLabel(props)}>{children} {note}</label>
  );
}

Label.propTypes = {
  children: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  note: PropTypes.string,
};

function classNameForLabel() {
  return styles.Label;
}
