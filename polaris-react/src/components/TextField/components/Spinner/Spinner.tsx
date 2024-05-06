import React from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
} from '@shopify/polaris-icons';

import {Icon} from '../../../Icon';
import styles from '../../TextField.module.css';
import {useBreakpoints} from '../../../../utilities/breakpoints';
import {classNames} from '../../../../utilities/css';

type HandleStepFn = (step: number) => void;

export interface SpinnerProps {
  canIncrement: boolean;
  canDecrement: boolean;
  onChange: HandleStepFn;
  onClick?(event: React.MouseEvent): void;
  onMouseDown(onChange: HandleStepFn): void;
  onMouseUp(): void;
  onBlur(event: React.FocusEvent): void;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner(
    {
      canDecrement,
      canIncrement,
      onChange,
      onClick,
      onMouseDown,
      onMouseUp,
      onBlur,
    },
    ref,
  ) {
    function handleStep(step: number) {
      return () => onChange(step);
    }

    function handleMouseDown(onChange: HandleStepFn) {
      return (event: React.MouseEvent) => {
        if (event.button !== 0) return;
        onMouseDown?.(onChange);
      };
    }

    const {mdDown} = useBreakpoints();
    const increaseIconSource = mdDown ? PlusIcon : ChevronUpIcon;
    const decreaseIconSource = mdDown ? MinusIcon : ChevronDownIcon;
    const isIncrementDisabled = mdDown && !canIncrement;
    const isDecrementDisabled = mdDown && !canDecrement;

    return (
      <div
        className={mdDown ? styles.MobileStepper : styles.Spinner}
        onClick={onClick}
        aria-hidden
        ref={ref}
      >
        <div
          role="button"
          className={classNames(
            styles.Segment,
            isIncrementDisabled && styles.disabledSpinnerButton,
          )}
          tabIndex={-1}
          onClick={handleStep(1)}
          onMouseDown={handleMouseDown(handleStep(1))}
          onMouseUp={onMouseUp}
          onBlur={onBlur}
        >
          <div className={styles.SpinnerIcon}>
            <Icon source={increaseIconSource} />
          </div>
        </div>
        <div
          role="button"
          className={classNames(
            styles.Segment,
            isDecrementDisabled && styles.disabledSpinnerButton,
          )}
          tabIndex={-1}
          onClick={handleStep(-1)}
          onMouseDown={handleMouseDown(handleStep(-1))}
          onMouseUp={onMouseUp}
          onBlur={onBlur}
        >
          <div className={styles.SpinnerIcon}>
            <Icon source={decreaseIconSource} />
          </div>
        </div>
      </div>
    );
  },
);
