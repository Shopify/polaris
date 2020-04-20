import React from 'react';

import {classNames} from '../../../../utilities/css';
import type {ComplexAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {Stack} from '../../../Stack';
import {ButtonGroup} from '../../../ButtonGroup';
import {Subheading} from '../../../Subheading';
import styles from '../../Card.scss';

export interface SectionProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  subdued?: boolean;
  fullWidth?: boolean;
  actions?: ComplexAction[];
}

export function Section({
  children,
  title,
  subdued,
  fullWidth,
  actions,
}: SectionProps) {
  const className = classNames(
    styles.Section,
    subdued && styles['Section-subdued'],
    fullWidth && styles['Section-fullWidth'],
  );

  const actionMarkup = actions ? (
    <ButtonGroup>{buttonsFrom(actions, {plain: true})}</ButtonGroup>
  ) : null;

  const titleMarkup =
    typeof title === 'string' ? <Subheading>{title}</Subheading> : title;

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
