import React from 'react';

import {classNames} from '../../utilities/css';
import {ScrollLock} from '../ScrollLock';

import styles from './Backdrop.scss';

export interface BackdropProps {
  belowNavigation?: boolean;
  transparent?: boolean;
  onClick?(): void;
  onTouchStart?(): void;
}

export function Backdrop(props: BackdropProps) {
  const {onClick, onTouchStart, belowNavigation, transparent} = props;

  const className = classNames(
    styles.Backdrop,
    belowNavigation && styles.belowNavigation,
    transparent && styles.transparent,
  );

  return (
    <React.Fragment>
      <ScrollLock />
      <div
        className={className}
        onClick={onClick}
        testID="Backdrop"
        onTouchStart={onTouchStart}
      />
    </React.Fragment>
  );
}
