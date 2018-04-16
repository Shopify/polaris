import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './Indicator.scss';

export interface Props {
  active?: boolean;
  pulse?: boolean;
}

export default function Indicator({active = false, pulse = true}: Props) {
  const className = classNames(
    active && styles.Indicator,
    pulse && styles.pulseIndicator,
  );

  return active ? <span className={className} /> : null;
}
