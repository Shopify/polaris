import React, {isValidElement} from 'react';

import type {DisableableAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {ButtonGroup} from '../../../ButtonGroup';
import {LegacyStack} from '../../../LegacyStack';
import {Text} from '../../../Text';
import styles from '../../LegacyCard.scss';
import {useFeatures} from '../../../../utilities/features';
import {HorizontalStack} from '../../../HorizontalStack';

export interface LegacyCardHeaderProps {
  title?: React.ReactNode;
  actions?: DisableableAction[];
  children?: React.ReactNode;
}

export function Header({children, title, actions}: LegacyCardHeaderProps) {
  const {polarisSummerEditions2023} = useFeatures();
  const actionMarkup = actions ? (
    <ButtonGroup>{buttonsFrom(actions, {plain: true})}</ButtonGroup>
  ) : null;

  const titleMarkup = isValidElement(title) ? (
    title
  ) : (
    <Text
      variant={polarisSummerEditions2023 ? 'headingSm' : 'headingMd'}
      as="h2"
    >
      {title}
    </Text>
  );

  const headingMarkup =
    // eslint-disable-next-line no-nested-ternary
    actionMarkup || children ? (
      polarisSummerEditions2023 ? (
        <HorizontalStack
          wrap={false}
          gap="2"
          align="space-between"
          blockAlign="center"
        >
          {titleMarkup}
          <HorizontalStack wrap={false} gap="4" blockAlign="center">
            {actionMarkup}
            {children}
          </HorizontalStack>
        </HorizontalStack>
      ) : (
        <LegacyStack alignment="baseline">
          <LegacyStack.Item fill>{titleMarkup}</LegacyStack.Item>
          {actionMarkup}
          {children}
        </LegacyStack>
      )
    ) : (
      titleMarkup
    );

  return <div className={styles.Header}>{headingMarkup}</div>;
}
