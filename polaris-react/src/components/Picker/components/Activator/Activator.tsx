import {SelectIcon} from '@shopify/polaris-icons';
import React, {forwardRef} from 'react';

import {BlockStack} from '../../../BlockStack';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {classNames} from '../../../../utilities/css';

import styles from './Activator.module.css';

export interface ActivatorProps {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  selected?: string;
  onClick?(): void;
}

export const Activator = forwardRef<HTMLButtonElement, ActivatorProps>(
  ({disabled, label, placeholder, selected, onClick}, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        className={classNames(styles.Activator, disabled && styles.disabled)}
        type="button"
      >
        <BlockStack as="span" gap="100">
          {label && (
            <Text as="span" variant="bodySm" alignment="start" tone="subdued">
              {label}
            </Text>
          )}

          {(selected !== '' || placeholder) && (
            <Text
              as="span"
              variant="bodyMd"
              alignment="start"
              tone={selected ? undefined : 'subdued'}
            >
              {selected || placeholder}
            </Text>
          )}
        </BlockStack>
        <span>
          <Icon tone="subdued" source={SelectIcon} />
        </span>
      </button>
    );
  },
);

Activator.displayName = 'Activator';
