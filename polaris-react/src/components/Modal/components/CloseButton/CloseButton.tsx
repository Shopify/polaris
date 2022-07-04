import React from 'react';
import {MobileCancelMajor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {Icon} from '../../../Icon';

import styles from './CloseButton.scss';

export interface CloseButtonProps {
  titleHidden?: boolean;
  backdropClicked: boolean;
  onClick(): void;
}

export function CloseButton({
  titleHidden = false,
  backdropClicked,
  onClick,
}: CloseButtonProps) {
  const i18n = useI18n();

  return (
    <button
      onClick={onClick}
      className={classNames(
        styles.CloseButton,
        backdropClicked && styles.BackdropClicked,
        titleHidden && styles.titleHidden,
      )}
      aria-label={i18n.translate('Polaris.Common.close')}
    >
      <Icon source={MobileCancelMajor} color="base" />
    </button>
  );
}
