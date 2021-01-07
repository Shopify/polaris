import React from 'react';
import {MobileCancelMajor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {Icon} from '../../../Icon';

import styles from './CloseButton.scss';

export interface CloseButtonProps {
  title?: boolean;
  onClick(): void;
}

export function CloseButton({title = true, onClick}: CloseButtonProps) {
  const i18n = useI18n();

  const className = classNames(
    styles.CloseButton,
    !title && styles.withoutTitle,
  );

  return (
    <button
      onClick={onClick}
      className={className}
      aria-label={i18n.translate('Polaris.Common.close')}
    >
      <Icon source={MobileCancelMajor} color="base" />
    </button>
  );
}
