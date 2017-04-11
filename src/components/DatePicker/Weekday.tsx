import * as React from 'react';
import {
  Weekdays,
} from '@shopify/javascript-utilities/dates';

import * as styles from './DatePicker.scss';

export interface Props {
  label: Weekdays,
  title: string,
}

export default function Weekday({label, title}: Props) {
  return <div aria-label={Weekdays[label]} className={styles.Weekday}>{title}</div>;
}
