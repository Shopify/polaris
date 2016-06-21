import React, {Children, PropTypes} from 'react';
import styles from './index.css';

import {css} from '../../utilities/styles';

export default function Form(props) {
  const {children} = props;

  return (
    <div className={classNameForForm(props)}>
      {Children.map(children, (child) => <FormItem>{child}</FormItem>)}
    </div>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  condensed: PropTypes.bool,
};

Form.defaultProps = {
  condensed: false,
};

function classNameForForm({condensed}) {
  return css([
    styles.Form,
    condensed && styles.condensed,
  ]);
}

function FormItem(props) {
  return (
    <div className={styles.Item}>{props.children}</div>
  );
}

FormItem.propTypes = {children: PropTypes.node};
