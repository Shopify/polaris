import React from 'react';

import {classNames} from '../../utilities/css';
import {useFeatures} from '../../utilities/features';

import styles from './KeyboardKey.scss';

type Size = 'small';

export interface KeyboardKeyProps {
  children?: string;
  size?: Size;
}
export function KeyboardKey({children = '', size}: KeyboardKeyProps) {
  const {polarisSummerEditions2023} = useFeatures();
  const key =
    !size && children.length > 1
      ? children.toLowerCase()
      : children.toUpperCase();

  const className = classNames(
    styles.KeyboardKey,
    size && styles[size],
    polarisSummerEditions2023 && styles.small,
  );

  return <kbd className={className}>{key}</kbd>;
}
