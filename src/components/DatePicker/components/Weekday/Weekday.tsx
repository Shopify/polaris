import React, {memo} from 'react';

import {classNames} from '../../../../utilities/css';
import {Weekday as WeekdayEnum} from '../../../../utilities/dates';
import styles from '../../DatePicker.scss';

export interface WeekdayProps {
  label: WeekdayEnum;
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
    <div aria-label={WeekdayEnum[label]} className={className}>
      {title}
    </div>
  );
});
