import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import styles from './Indicator.scss';

export interface Props {
  pulse?: boolean;
}

export default function Indicator({pulse = true}: Props) {
  const className = classNames(
    styles.Indicator,
    pulse && styles.pulseIndicator,
  );

  return <span className={className} />;
}
