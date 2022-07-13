import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './Label.scss';

export interface LabelProps {
  /** Label content */
  children?: React.ReactNode;
  /** A unique identifier for the label */
  id: string;
  /** Visually hide the label */
  hidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
}

export function labelID(id: string) {
  return `${id}Label`;
}

/**
 * @deprecated The Label component will be removed in the next
 * major version. Use the Text component instead. See the
 * Polaris component guide on how to use Text.
 *
 * https://polaris.shopify.com/components/text
 */
export function Label({children, id, hidden, requiredIndicator}: LabelProps) {
  const className = classNames(styles.Label, hidden && styles.hidden);

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The `Label` component has been deprecated. Use the `Text` component instead. See the Polaris component guide on how to use `Text`. https://polaris.shopify.com/components/text',
    );
  }

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
        {children}
      </label>
    </div>
  );
}
