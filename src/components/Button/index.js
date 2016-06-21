import React, {PropTypes} from 'react';
import styles from './index.css';

import {css} from '../../utilities/styles';
import {noop} from '../../utilities/other';

export default function Button(props) {
  const {disabled, children, onPress} = props;

  return (
    <button onClick={onPress} className={classNameForButton(props)} disabled={disabled}>
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
  link: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool.isRequired,
};

Button.defaultProps = {
  primary: false,
  destructive: false,
  disabled: false,
  slim: false,
  link: false,
  fullWidth: false,
  onPress: noop,
};

function classNameForButton({primary, destructive, disabled, slim, link, fullWidth}) {
  return css([
    styles.Button,
    primary && styles.primary,
    destructive && styles.destructive,
    disabled && styles.disabled,
    slim && styles.slim,
    link && styles.link,
    fullWidth && styles.fullWidth,
  ]);
}
