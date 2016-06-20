import React, {PropTypes} from 'react';
import styles from './index.css';

export default function Frame({children}) {
  return (
    <div className={styles.Frame}>
      {children}
    </div>
  );
}

Frame.propTypes = {
  children: PropTypes.node,
};
