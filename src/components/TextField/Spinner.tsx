import * as React from 'react';
import Icon from '../Icon';
import * as styles from './TextField.scss';

export interface Props {
  onChange(delta: number): void,
}

export default function Spinner({onChange}: Props) {
  function handleStep(step: number) {
    return () => onChange(step);
  }

  return (
    <div className={styles.Spinner} aria-hidden>
      <div
        role="button"
        className={styles.Segment}
        tabIndex={-1}
        onClick={handleStep(1)}
      >
        <Icon source="caretUp" size={12} />
      </div>

      <div
        role="button"
        className={styles.Segment}
        tabIndex={-1}
        onClick={handleStep(-1)}
      >
        <Icon source="caretDown" size={12} />
      </div>
    </div>
  );
}
