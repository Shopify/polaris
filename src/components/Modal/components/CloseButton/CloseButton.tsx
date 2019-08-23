import React from 'react';
import {MobileCancelMajorMonotone} from '@shopify/polaris-icons';
import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';

import Icon from '../../../Icon';

import styles from './CloseButton.scss';

export interface CloseButtonProps {
  title?: boolean;
  onClick(): void;
}

export function CloseButton({title = true, onClick}: CloseButtonProps) {
  const intl = useI18n();

  const className = classNames(
    styles.CloseButton,
    !title && styles.withoutTitle,
  );

  return (
    <button
      onClick={onClick}
      className={className}
      aria-label={intl.translate('Polaris.Common.close')}
    >
      <Icon source={MobileCancelMajorMonotone} color="inkLighter" />
    </button>
  );
}
