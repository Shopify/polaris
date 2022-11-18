import React from 'react';
import {MobileCancelMajor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {Icon} from '../../../Icon';

import styles from './CloseButton.scss';

export interface CloseButtonProps {
  pressed?: boolean;
  titleHidden?: boolean;
  onClick(): void;
}

export function CloseButton({
  pressed,
  titleHidden = false,
  onClick,
}: CloseButtonProps) {
  const i18n = useI18n();

  return (
    <button
      onClick={onClick}
      className={classNames(
        styles.CloseButton,
        titleHidden && styles.titleHidden,
        pressed && styles.pressed,
      )}
      aria-label={i18n.translate('Polaris.Common.close')}
    >
      <Icon source={MobileCancelMajor} color="base" />
    </button>
  );
}
