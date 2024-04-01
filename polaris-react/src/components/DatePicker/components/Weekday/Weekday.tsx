import React, {memo} from 'react';

import {Text} from '../../../Text';
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
  return (
    <th aria-label={label} scope="col" className={styles.Weekday}>
      <Text
        as="span"
        variant="bodySm"
        alignment="center"
        fontWeight={current ? 'bold' : 'regular'}
        tone={!current ? 'subdued' : undefined}
      >
        {title}
      </Text>
    </th>
  );
});
