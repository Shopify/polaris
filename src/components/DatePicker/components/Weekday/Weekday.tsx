import React, {memo} from 'react';
import {Weekdays} from '@shopify/javascript-utilities/dates';

import {classNames} from '../../../../utilities/css';
import styles from '../../DatePicker.scss';

export interface WeekdayProps {
  label: Weekdays;
  title: string;
  current: boolean;
}

export const Weekday = memo(function Weekday({
  label,
  title,
  current,
}: WeekdayProps) {
  const className = classNames(
    styles.Weekday,
    current && styles['Weekday-current'],
  );

  return (
    <div aria-label={Weekdays[label]} className={className}>
      {title}
    </div>
  );
});
