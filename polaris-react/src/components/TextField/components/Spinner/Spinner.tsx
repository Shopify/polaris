import React from 'react';
import {
  CaretDownMinor,
  CaretUpMinor,
  ChevronDownMinor,
  ChevronUpMinor,
} from '@shopify/polaris-icons';

import {Icon} from '../../../Icon';
import styles from '../../TextField.scss';
import {useFeatures} from '../../../../utilities/features';

type HandleStepFn = (step: number) => void;

export interface SpinnerProps {
  onChange: HandleStepFn;
  onClick?(event: React.MouseEvent): void;
  onMouseDown(onChange: HandleStepFn): void;
  onMouseUp(): void;
  onBlur(event: React.FocusEvent): void;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner({onChange, onClick, onMouseDown, onMouseUp, onBlur}, ref) {
    const {polarisSummerEditions2023} = useFeatures();

    function handleStep(step: number) {
      return () => onChange(step);
    }

    function handleMouseDown(onChange: HandleStepFn) {
      return (event: React.MouseEvent) => {
        if (event.button !== 0) return;
        onMouseDown(onChange);
      };
    }

    return (
      <div className={styles.Spinner} onClick={onClick} aria-hidden ref={ref}>
        <div
          role="button"
          className={styles.Segment}
          tabIndex={-1}
          onClick={handleStep(1)}
          onMouseDown={handleMouseDown(handleStep(1))}
          onMouseUp={onMouseUp}
          onBlur={onBlur}
        >
          <div className={styles.SpinnerIcon}>
            <Icon
              source={polarisSummerEditions2023 ? ChevronUpMinor : CaretUpMinor}
            />
          </div>
        </div>
        <div
          role="button"
          className={styles.Segment}
          tabIndex={-1}
          onClick={handleStep(-1)}
          onMouseDown={handleMouseDown(handleStep(-1))}
          onMouseUp={onMouseUp}
          onBlur={onBlur}
        >
          <div className={styles.SpinnerIcon}>
            <Icon
              source={
                polarisSummerEditions2023 ? ChevronDownMinor : CaretDownMinor
              }
            />
          </div>
        </div>
      </div>
    );
  },
);
