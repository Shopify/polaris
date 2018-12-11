import * as React from 'react';
import Icon from '../../../Icon';

import * as styles from '../../TextField.scss';

export interface Props {
  onChange(delta: number): void;
  onClick?(): void;
  onMouseDown(onChange: Function): void;
  onMouseUp(): void;
}

export default function Spinner({
  onChange,
  onClick,
  onMouseDown,
  onMouseUp,
}: Props) {
  function handleStep(step: number) {
    return () => onChange(step);
  }

  function handleMouseDown(onChange: Function) {
    return () => onMouseDown(onChange);
  }

  return (
    <div className={styles.Spinner} onClick={onClick} aria-hidden>
      <div
        role="button"
        className={styles.Segment}
        tabIndex={-1}
        onClick={handleStep(1)}
        onMouseDown={handleMouseDown(handleStep(1))}
        onMouseUp={onMouseUp}
      >
        <div className={styles.SpinnerIcon}>
          <Icon source="caretUp" />
        </div>
      </div>

      <div
        role="button"
        className={styles.Segment}
        tabIndex={-1}
        onClick={handleStep(-1)}
        onMouseDown={handleMouseDown(handleStep(-1))}
        onMouseUp={onMouseUp}
      >
        <div className={styles.SpinnerIcon}>
          <Icon source="caretDown" />
        </div>
      </div>
    </div>
  );
}
