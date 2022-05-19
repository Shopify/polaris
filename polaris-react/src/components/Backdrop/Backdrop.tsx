import React from 'react';

import {classNames} from '../../utilities/css';
import {usePerformanceBenchmark} from '../../utilities/use-performance-benchmark';
import {ScrollLock} from '../ScrollLock';

import styles from './Backdrop.scss';

export interface BackdropProps {
  belowNavigation?: boolean;
  transparent?: boolean;
  onClick?(): void;
  onTouchStart?(): void;
}

export function Backdrop(props: BackdropProps) {
  usePerformanceBenchmark('Backdrop');
  const {onClick, onTouchStart, belowNavigation, transparent} = props;

  const className = classNames(
    styles.Backdrop,
    belowNavigation && styles.belowNavigation,
    transparent && styles.transparent,
  );

  return (
    <>
      <ScrollLock />
      <div
        className={className}
        onClick={onClick}
        onTouchStart={onTouchStart}
      />
    </>
  );
}
