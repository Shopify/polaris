import React from 'react';

import {classNames} from '../../../../utilities/css';
import type {ComplexAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {LegacyStack} from '../../../LegacyStack';
import {ButtonGroup} from '../../../ButtonGroup';
import {Text} from '../../../Text';
import styles from '../../Card.module.scss';

export interface CardSectionProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  subdued?: boolean;
  flush?: boolean;
  fullWidth?: boolean;
  /** Allow the card to be hidden when printing */
  hideOnPrint?: boolean;
  actions?: ComplexAction[];
}

/** @deprecated Use LegacyCard or AlphaCard instead. */
export function Section({
  children,
  title,
  subdued,
  flush,
  fullWidth,
  actions,
  hideOnPrint,
}: CardSectionProps) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: <Card /> is deprecated. This component will be removed in a future major version of Polaris. Use <LegacyCard /> or <AlphaCard /> instead.',
    );
  }

  const className = classNames(
    styles.Section,
    flush && styles['Section-flush'],
    subdued && styles['Section-subdued'],
    fullWidth && styles['Section-fullWidth'],
    hideOnPrint && styles['Section-hideOnPrint'],
  );

  const actionMarkup = actions ? (
    <ButtonGroup>{buttonsFrom(actions, {plain: true})}</ButtonGroup>
  ) : null;

  const titleMarkup =
    typeof title === 'string' ? (
      <Text variant="headingSm" as="h3">
        {title}
      </Text>
    ) : (
      title
    );

  const titleAreaMarkup =
    titleMarkup || actionMarkup ? (
      <div className={styles.SectionHeader}>
        {actionMarkup ? (
          <LegacyStack alignment="baseline">
            <LegacyStack.Item fill>{titleMarkup}</LegacyStack.Item>
            {actionMarkup}
          </LegacyStack>
        ) : (
          titleMarkup
        )}
      </div>
    ) : null;

  return (
    <div className={className}>
      {titleAreaMarkup}
      {children}
    </div>
  );
}
