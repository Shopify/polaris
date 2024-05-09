import React from 'react';

import {classNames} from '../../utilities/css';
import type {TextProps} from '../Text';
import {Text} from '../Text';

import styles from './Label.module.css';

export interface LabelProps {
  /** Label content */
  children?: React.ReactNode;
  /** A unique identifier for the label */
  id: string;
  /** Visually hide the label */
  hidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
  /** Text variant */
  variant?: TextProps['variant'];

  /** Text tone*/
  tone?: TextProps['tone'];
}

export function labelID(id: string) {
  return `${id}Label`;
}

export function Label({
  children,
  id,
  hidden,
  requiredIndicator,
  variant = 'bodyMd',
  tone,
}: LabelProps) {
  const className = classNames(styles.Label, hidden && styles.hidden);

  return (
    <div className={className}>
      <label
        id={labelID(id)}
        htmlFor={id}
        className={classNames(
          styles.Text,
          requiredIndicator && styles.RequiredIndicator,
        )}
      >
        <Text as="span" variant={variant} tone={tone}>
          {children}
        </Text>
      </label>
    </div>
  );
}
