import * as React from 'react';
import {classNames} from '@shopify/css-utilities';
import styles from './Indicator.scss';

type Tone = 'positive' | 'neutral' | 'negative';

export interface Props {
  // Defaults to positive
  tone?: Tone;
  // Sets an animated transparent background
  pulse?: boolean;
}

export default function Indicator({pulse, tone = 'positive'}: Props) {
  const className = classNames(
    styles.Indicator,
    pulse && styles['Indicator-pulse'],
    tone && styles[`Indicator-${tone}`],
  );

  return <span className={className} />;
}
