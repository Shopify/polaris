import React from 'react';
import {XIcon} from '@shopify/polaris-icons';

import {useI18n} from '../../../../utilities/i18n';
import {Button} from '../../../Button';

export interface CloseButtonProps {
  pressed?: boolean;
  onClick(): void;
}

export function CloseButton({pressed, onClick}: CloseButtonProps) {
  const i18n = useI18n();

  return (
    <Button
      variant="tertiary"
      pressed={pressed}
      icon={XIcon}
      onClick={onClick}
      accessibilityLabel={i18n.translate('Polaris.Common.close')}
    />
  );
}
