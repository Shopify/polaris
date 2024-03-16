import {SelectIcon} from '@shopify/polaris-icons';
import React from 'react';

import {BlockStack} from '../../../BlockStack';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {UnstyledButton} from '../../../UnstyledButton';
import {classNames} from '../../../../utilities/css';

import styles from './Activator.module.css';

export interface ActivatorProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onClick?(): void;
}

export function Activator({
  disabled,
  label,
  placeholder,
  onClick,
}: ActivatorProps) {
  return (
    <UnstyledButton
      className={classNames(styles.Activator, disabled && styles.disabled)}
      onClick={onClick}
    >
      <BlockStack as="span" gap="100">
        {label && (
          <Text as="span" variant="bodySm" alignment="start" tone="subdued">
            {label}
          </Text>
        )}

        {placeholder && (
          <Text as="span" variant="bodyMd" alignment="start">
            {placeholder}
          </Text>
        )}
      </BlockStack>
      <span>
        <Icon tone="subdued" source={SelectIcon} />
      </span>
    </UnstyledButton>
  );
}
