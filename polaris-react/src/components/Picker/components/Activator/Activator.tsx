import {SelectIcon} from '@shopify/polaris-icons';
import React from 'react';

import {BlockStack} from '../../../BlockStack';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {UnstyledButton} from '../../../UnstyledButton';

import styles from './Activator.module.css';

export interface ActivatorProps {
  label: string;
  placeholder?: string;
  onClick?(): void;
}

export function Activator({placeholder, onClick, label}: ActivatorProps) {
  return (
    <UnstyledButton className={styles.Activator} onClick={onClick}>
      <BlockStack as="span" gap="100">
        <Text as="span" variant="bodySm" alignment="start" tone="subdued">
          {label}
        </Text>
        <Text as="span" variant="bodyMd" alignment="start">
          {placeholder}
        </Text>
      </BlockStack>
      <span>
        <Icon tone="subdued" source={SelectIcon} />
      </span>
    </UnstyledButton>
  );
}
