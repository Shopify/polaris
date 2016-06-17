import React, {PropTypes} from 'react';
import styles from './index.css';
import {css} from '../../utilities';

export default function Button(props) {
  const {disabled, children} = props;

  return (
    <button className={classNameForButton(props)} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  primary: PropTypes.bool.isRequired,
  destructive: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  slim: PropTypes.bool.isRequired,
};

Button.defaultProps = {
  primary: false,
  destructive: false,
  disabled: false,
  slim: false,
};

function classNameForButton({primary, destructive, disabled, slim}) {
  return css([
    styles.Button,
    primary && styles.primary,
    destructive && styles.destructive,
    disabled && styles.disabled,
    slim && styles.slim,
  ]);
}
