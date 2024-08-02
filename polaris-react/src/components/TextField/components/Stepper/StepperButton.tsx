import {MinusIcon} from '@shopify/polaris-icons';
import React from 'react';

import type {IconSource} from '../../../..';
import {Button} from '../../../Button';

interface Props {
  source: IconSource;
  disabled: boolean;
  onPress: (step: number) => void;
}

export function StepperButton({source, disabled, onPress}: Props) {
  const valueChange = source === MinusIcon ? -1 : 1;

  return (
    <Button
      key={source.toString()}
      variant="plain"
      disabled={disabled}
      icon={source}
      onClick={() => onPress(valueChange)}
    />
  );
}
