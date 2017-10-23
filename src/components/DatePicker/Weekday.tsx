import * as React from 'react';
import {
  Weekdays,
} from '@shopify/javascript-utilities/dates';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './DatePicker.scss';

export interface Props {
  label: Weekdays,
  title: string,
  current: boolean,
}

export default function Weekday({label, title, current}: Props) {
  const className = classNames(
    styles.Weekday,
    current && styles['Weekday-current'],
  );

  return <div aria-label={Weekdays[label]} className={className}>{title}</div>;
}
