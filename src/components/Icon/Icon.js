// @flow

import React from 'react';

import {css, variation} from '../../utilities/styles';

import styles from './Icon.scss';

type Props = {
  size?: 'small' | 'large',
};

export default function Icon(props: Props) {
  return (
    <div className={classNameForIcon(props)} />
  );
}

function classNameForIcon({size}: Props) {
  return css([
    styles.Icon,
    size && styles[variation('size', size)],
  ]);
}
