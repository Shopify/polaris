import React, {PropTypes} from 'react';
import styles from './Form.scss';

export default function FormItem(props) {
  return (
    <div className={styles.Item}>{props.children}</div>
  );
}

FormItem.propTypes = {children: PropTypes.node};
