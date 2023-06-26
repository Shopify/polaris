import React from 'react';
import {MobileCancelMajor, CancelMajor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {useFeatures} from '../../../../utilities/features';
import {Icon} from '../../../Icon';
import {Button} from '../../../Button';

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
  const {polarisSummerEditions2023} = useFeatures();

  return polarisSummerEditions2023 ? (
    <Button
      primary
      plain
      pressed={pressed}
      icon={CancelMajor}
      onClick={onClick}
      accessibilityLabel={i18n.translate('Polaris.Common.close')}
    />
  ) : (
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
