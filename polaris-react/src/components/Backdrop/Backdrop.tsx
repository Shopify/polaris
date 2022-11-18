import React, {Dispatch, SetStateAction} from 'react';

import {classNames} from '../../utilities/css';
import {ScrollLock} from '../ScrollLock';

import styles from './Backdrop.scss';

export interface BackdropProps {
  belowNavigation?: boolean;
  transparent?: boolean;
  onClick?(): void;
  onTouchStart?(): void;
  setClosing?: Dispatch<SetStateAction<boolean>>;
}

export function Backdrop(props: BackdropProps) {
  const {onClick, onTouchStart, belowNavigation, transparent, setClosing} =
    props;

  const className = classNames(
    styles.Backdrop,
    belowNavigation && styles.belowNavigation,
    transparent && styles.transparent,
  );

  const handleMouseDown = () => {
    if (setClosing) {
      setClosing(true);
    }
  };

  const handleMouseUp = () => {
    if (setClosing && onClick) {
      setClosing(false);
      onClick();
    }
  };

  return (
    <>
      <ScrollLock />
      <div
        className={className}
        onClick={onClick}
        onTouchStart={onTouchStart}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </>
  );
}
