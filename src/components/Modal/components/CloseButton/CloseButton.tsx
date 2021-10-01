import React from 'react';
import {MobileCancelMajor} from '@shopify/polaris-icons';

import {useI18n} from '../../../../utilities/i18n';
import {Icon} from '../../../Icon';

import styles from './CloseButton.scss';

export interface CloseButtonProps {
  onClick(): void;
}

export function CloseButton({onClick}: CloseButtonProps) {
  const i18n = useI18n();

  return (
    <button
      onClick={onClick}
      className={styles.CloseButton}
      aria-label={i18n.translate('Polaris.Common.close')}
    >
      <Icon source={MobileCancelMajor} color="base" />
    </button>
  );
}
