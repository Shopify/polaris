import {MinusIcon} from '@shopify/polaris-icons';
import React from 'react';

import type {IconSource} from '../../../..';
import {Button} from '../../../Button';
import styles from './StepperButton.module.css';
import {classNames} from '../../../../utilities/css';

interface Props {
  source: IconSource;
  disabled: boolean;
  onPress: (step: number) => void;
}

export function StepperButton({source, disabled, onPress}: Props) {
  const valueChange = source === MinusIcon ? -1 : 1;

  return (
    <div className={classNames(styles.StepperButton)}>
      <Button
        key={source.toString()}
        variant="plain"
        disabled={disabled}
        icon={source}
        onClick={() => onPress(valueChange)}
      />
    </div>
  );
}
