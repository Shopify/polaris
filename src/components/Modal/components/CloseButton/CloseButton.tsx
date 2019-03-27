import * as React from 'react';
import {MobileCancelMajorMonotone} from '@shopify/polaris-icons';
import {classNames} from '@shopify/react-utilities';

import Icon from '../../../Icon';

import styles from './CloseButton.scss';

export interface Props {
  title?: boolean;
  onClick(): void;
}

export default function CloseButton({title = true, onClick}: Props) {
  const className = classNames(
    styles.CloseButton,
    !title && styles.withoutTitle,
  );

  return (
    <button onClick={onClick} className={className}>
      <Icon source={MobileCancelMajorMonotone} color="inkLighter" />
    </button>
  );
}
