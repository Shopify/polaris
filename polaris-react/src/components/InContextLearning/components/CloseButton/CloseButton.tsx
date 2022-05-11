import React from 'react';
import {MobileCancelMajor} from '@shopify/polaris-icons';
import {useI18n} from '../../../../utilities/i18n';
import {Button} from '../../../Button';

import styles from './CloseButton.scss';

export interface CloseButtonProps {
  onDismiss(): void;
  title?: string;
}

export function CloseButton({onDismiss, title}: CloseButtonProps) {
  const i18n = useI18n();

  return (
    <div className={styles.CloseButton}>
      <Button
        plain
        icon={MobileCancelMajor}
        onClick={onDismiss}
        accessibilityLabel={i18n.translate(
          'Polaris.InContextLearning.accessibilityLabel',
          {tutorialName: title ?? ''},
        )}
      />
    </div>
  );
}
