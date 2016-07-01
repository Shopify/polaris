// @flow

import React from 'react';
import styles from './Button.scss';

import {css} from '../../utilities/styles';
import {noop} from '../../utilities/other';

type Props = {
  children?: any,
  primary?: boolean,
  destructive?: boolean,
  disabled?: boolean,
  link?: boolean,
  onPress?: (event: Object) => void,
  fullWidth?: boolean,
};

export default function Button(props: Props) {
  const {disabled, children, onPress} = props;

  return (
    <button onClick={onPress} className={classNameForButton(props)} disabled={disabled}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  primary: false,
  destructive: false,
  disabled: false,
  link: false,
  fullWidth: false,
  onPress: noop,
};

function classNameForButton({primary, destructive, disabled, link, fullWidth}) {
  return css([
    styles.Button,
    primary && styles.primary,
    destructive && styles.destructive,
    disabled && styles.disabled,
    link && styles.link,
    fullWidth && styles.fullWidth,
  ]);
}
