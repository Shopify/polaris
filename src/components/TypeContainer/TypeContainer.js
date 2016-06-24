import React, {PropTypes} from 'react';
import styles from './TypeContainer.scss';

export default function TypeContainer({children}) {
  return (
    <div className={styles.TypeContainer}>{children}</div>
  );
}

TypeContainer.propTypes = {
  children: PropTypes.node,
};
