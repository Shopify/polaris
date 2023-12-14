import React, {useRef, useEffect, memo} from 'react';

import {classNames} from '../../../../utilities/css';
import {isSameDay} from '../../../../utilities/dates';
import {useI18n} from '../../../../utilities/i18n';
import {monthName} from '../../utilities';
import styles from '../../DatePicker.module.scss';

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
  rangeIsDifferent?: boolean;
  weekday?: string;
  selectedAccessibilityLabelPrefix?: string;
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
  rangeIsDifferent,
  weekday,
  selectedAccessibilityLabelPrefix,
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
      <td
        className={styles.EmptyDayCell}
        onMouseOver={() => onHover(hoverValue)}
      />
    );
  }
  const handleClick = onClick && !disabled ? onClick.bind(null, day) : noop;
  const today = isSameDay(new Date(), day);

  const dayCellClassName = classNames(
    styles.DayCell,
    selected && styles['DayCell-selected'],
    (inRange || inHoveringRange) && !disabled && styles['DayCell-inRange'],
    isLastSelectedDay && styles['DayCell-lastInRange'],
    isFirstSelectedDay && styles['DayCell-firstInRange'],
    isHoveringRight && styles['DayCell-hoverRight'],
    rangeIsDifferent && styles['DayCell-hasRange'],
  );

  const dayClassName = classNames(
    styles.Day,
    selected && styles['Day-selected'],
    disabled && styles['Day-disabled'],
    today && styles['Day-today'],
    (inRange || inHoveringRange) && !disabled && styles['Day-inRange'],
    isLastSelectedDay && styles['Day-lastInRange'],
    isFirstSelectedDay && styles['Day-firstInRange'],
    isHoveringRight && styles['Day-hoverRight'],
    rangeIsDifferent && styles['Day-hasRange'],
  );

  const date = day.getDate();
  const tabIndex =
    (focused || selected || today || date === 1) && !disabled ? 0 : -1;

  const ariaLabel = [
    selected && selectedAccessibilityLabelPrefix
      ? `${selectedAccessibilityLabelPrefix} `
      : '',
    `${today ? i18n.translate('Polaris.DatePicker.today') : ''}`,
    `${weekday ? weekday : ''} `,
    `${i18n.translate(
      `Polaris.DatePicker.months.${monthName(day.getMonth())}`,
    )} `,
    `${date} `,
    `${day.getFullYear()}`,
  ].join('');

  return (
    <td className={dayCellClassName}>
      <button
        onFocus={() => onFocus(day)}
        type="button"
        ref={dayNode}
        tabIndex={tabIndex}
        className={dayClassName}
        onMouseOver={() => onHover(hoverValue)}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        aria-pressed={selected}
      >
        {date}
      </button>
    </td>
  );
});

function noop() {}
