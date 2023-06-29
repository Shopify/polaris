import React from 'react';

import {classNames} from '../../../../utilities/css';
import type {ComplexAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {LegacyStack} from '../../../LegacyStack';
import {ButtonGroup} from '../../../ButtonGroup';
import {Text} from '../../../Text';
import styles from '../../LegacyCard.scss';
import {useFeatures} from '../../../../utilities/features';

export interface LegacyCardSectionProps {
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
}: LegacyCardSectionProps) {
  const {polarisSummerEditions2023} = useFeatures();
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
      <Text
        variant="headingSm"
        as="h3"
        fontWeight={polarisSummerEditions2023 ? 'medium' : 'semibold'}
      >
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
