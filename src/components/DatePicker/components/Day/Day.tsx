import React, {useRef, useEffect, memo} from 'react';
import {Months, isSameDay} from '@shopify/javascript-utilities/dates';
import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';

import styles from '../../DatePicker.scss';

export interface DayProps {
  focused?: boolean;
  day?: Date;
  selected?: boolean;
  inRange?: boolean;
  inHoveringRange?: boolean;
  disabled?: boolean;
  lastDayOfMonth?: any;
  isLastSelectedDay?: boolean;
  isFirstSelectedDay?: boolean;
  isHoveringRight?: boolean;
  isHoveringLeft?: boolean;
  rangeIsDifferent?: boolean;
  onClick?(day: Date): void;
  onHover?(day?: Date): void;
  onFocus?(day: Date): void;
}

export const Day = memo(function Day({
  day,
  focused,
  onClick,
  onHover = noop,
  onFocus = noop,
  selected,
  inRange,
  inHoveringRange,
  disabled,
  lastDayOfMonth,
  isLastSelectedDay,
  isFirstSelectedDay,
  isHoveringRight,
  isHoveringLeft,
  rangeIsDifferent,
}: DayProps) {
  const i18n = useI18n();
  const dayNode = useRef<HTMLButtonElement>(null);
  const hoverValue = lastDayOfMonth || day;

  useEffect(() => {
    if (focused && dayNode.current) {
      dayNode.current.focus();
    }
  }, [focused]);

  if (!day) {
    return (
      <div
        className={styles.EmptyDay}
        onMouseOver={() => onHover(hoverValue)}
      />
    );
  }
  const handleClick = onClick && !disabled ? onClick.bind(null, day) : noop;
  const today = isSameDay(new Date(), day);
  const className = classNames(
    styles.Day,
    selected && styles['Day-selected'],
    disabled && styles['Day-disabled'],
    today && styles['Day-today'],
    (inRange || inHoveringRange) && !disabled && styles['Day-inRange'],
    isLastSelectedDay && styles['Day-lastInRange'],
    isFirstSelectedDay && styles['Day-firstInRange'],
    isHoveringRight && styles['Day-hoverRight'],
    isHoveringLeft && styles['Day-hoverLeft'],
    rangeIsDifferent && styles['Day-hasRange'],
  );
  const date = day.getDate();
  const tabIndex =
    (focused || selected || today || date === 1) && !disabled ? 0 : -1;
  const ariaLabel = [
    `${today ? i18n.translate('Polaris.DatePicker.today') : ''}`,
    `${Months[day.getMonth()]} `,
    `${date} `,
    `${day.getFullYear()}`,
  ].join('');

  return (
    <button
      onFocus={() => onFocus(day)}
      type="button"
      ref={dayNode}
      tabIndex={tabIndex}
      className={className}
      onMouseOver={() => onHover(hoverValue)}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-selected={selected}
      aria-disabled={disabled}
      role="gridcell"
    >
      {date}
    </button>
  );
});

function noop() {}
