import React, {PropTypes} from 'react';
import styles from './index.scss';

import Label from '../Label';

import {css} from '../../utilities/styles';

export default function Labelled(props) {
  const {label, children, ...rest} = props;

  return (
    <div className={classNameForLabelled(props)}>
      <div className={styles.LabelWrapper}>
        <Label {...rest}>{label}</Label>
      </div>

      {children}
    </div>
  );
}

Labelled.propTypes = {
  children: PropTypes.node,
  labelHidden: PropTypes.bool,
  label: PropTypes.node,
};

Labelled.defaultProps = {

};

function classNameForLabelled({labelHidden}) {
  return css([
    styles.Labelled,
    labelHidden && styles.hidden,
  ]);
}
