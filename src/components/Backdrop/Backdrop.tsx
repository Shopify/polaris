import * as React from 'react';
import {classNames} from '@shopify/css-utilities';

import ScrollLock from '../ScrollLock';
import styles from './Backdrop.scss';

export interface Props {
  belowNavigation?: boolean;
  transparent?: boolean;
  onClick?(): void;
  onTouchStart?(): void;
}

export default function Backdrop(props: Props) {
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
