import * as React from 'react';
import {classNames} from '@shopify/react-utilities';

import * as styles from './Backdrop.scss';
import ScrollLock from '../ScrollLock';

export interface Props {
  onClick?(): void;
  onTouchStart?(): void;
  belowNavigation?: boolean;
}

export default function Backdrop(props: Props) {
  const {onClick, onTouchStart, belowNavigation} = props;

  const className = classNames(
    styles.Backdrop,
    belowNavigation && styles.belowNavigation,
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
