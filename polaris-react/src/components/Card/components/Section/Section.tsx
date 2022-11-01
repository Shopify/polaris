import React from 'react';

import {classNames} from '../../../../utilities/css';
import type {ComplexAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {Stack} from '../../../Stack';
import {ButtonGroup} from '../../../ButtonGroup';
import {Text} from '../../../Text';
import styles from '../../Card.scss';

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

export function Section({
  children,
  title,
  subdued,
  flush,
  fullWidth,
  actions,
  hideOnPrint,
}: CardSectionProps) {
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
          <Stack alignment="baseline">
            <Stack.Item fill>{titleMarkup}</Stack.Item>
            {actionMarkup}
          </Stack>
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
