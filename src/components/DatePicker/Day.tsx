import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {noop} from '@shopify/javascript-utilities/other';

import * as styles from './DatePicker.scss';

export interface Props {
  day?: Date,
  selected?: boolean,
  inRange?: boolean,
  inHoveringRange?: boolean,
  disabled?: boolean,
  onClick?(day: Date): void,
  onHover?(day: Date): void,
}

export default function Day({
  day,
  onClick,
  onHover,
  selected,
  inRange,
  inHoveringRange,
  disabled,
}: Props) {
  const handleHover = onHover ? onHover.bind(null, day) : noop;
  if (!day) {
    return <div className={styles.Day} onMouseOver={handleHover}/>;
  }
  const handleClick = onClick && !disabled ? onClick.bind(null, day) : noop;
  const className = classNames(
    styles.Day,
    selected && styles.selected,
    disabled && styles.disabled,
    (inRange || inHoveringRange) && styles.inRange,
  );

  return (
    <button
      className={className}
      onMouseOver={handleHover}
      onClick={handleClick}
    >
      {day.getDate()}
    </button>
  );
}
