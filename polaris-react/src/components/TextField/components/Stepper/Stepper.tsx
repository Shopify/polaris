import {MinusIcon, PlusIcon} from '@shopify/polaris-icons';
import React from 'react';
import {StepperButton} from './StepperButton';
import {Text} from '../../../Text';
import styles from './Stepper.module.css';
import {classNames} from '../../../../utilities/css';

interface Props {
  input: React.JSX.Element | null;
  label: React.ReactNode;
  hideLabel: boolean;
  canDecrement: boolean;
  canIncrement: boolean;
  handleNumberChange: (step: number) => void;
}
export function Stepper({
  input,
  label,
  hideLabel,
  canDecrement,
  canIncrement,
  handleNumberChange,
}: Props) {
  return (
    <div className={classNames(styles.Wrapper, hideLabel && styles.FullWidth)}>
      {hideLabel ? undefined : (
        <div className={styles.LabelWrapper}>
          <Text as="span" variant="bodyMd">
            {label}
          </Text>
        </div>
      )}

      <div className={styles.StepperWrapper}>
        <StepperButton
          source={MinusIcon}
          disabled={!canDecrement}
          onPress={handleNumberChange}
        />
        {input}
        <StepperButton
          source={PlusIcon}
          disabled={!canIncrement}
          onPress={handleNumberChange}
        />
      </div>
    </div>
  );
}
