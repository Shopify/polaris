import React, {memo} from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../DatePicker.module.css';

export interface WeekdayProps {
  label: string;
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
    <th aria-label={label} scope="col" className={className}>
      {title}
    </th>
  );
});
