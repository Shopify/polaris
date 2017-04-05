import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import fallbackSource from '../../flags/fallback.svg';

import * as styles from './Flag.scss';

export interface Props {
  source?: string,
  label?: string,
  thumbnail?: boolean,
}

export default function Flag({
  source = fallbackSource,
  label = '',
  thumbnail,
}: Props) {
  const className = classNames(
    styles.Flag,
    thumbnail && styles.thumbnail,
  );

  return <img className={className} src={source} alt={label} />;
}
