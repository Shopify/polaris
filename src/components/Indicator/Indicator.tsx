import React from 'react';
import {classNames} from '../../utilities/css';
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
