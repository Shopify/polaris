import React, {isValidElement} from 'react';

import type {DisableableAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {ButtonGroup} from '../../../ButtonGroup';
import {Text} from '../../../Text';
import styles from '../../LegacyCard.module.css';
import {InlineStack} from '../../../InlineStack';

export interface LegacyCardHeaderProps {
  title?: React.ReactNode;
  actions?: DisableableAction[];
  children?: React.ReactNode;
}

export function Header({children, title, actions}: LegacyCardHeaderProps) {
  const actionMarkup = actions ? (
    <ButtonGroup>{buttonsFrom(actions, {variant: 'plain'})}</ButtonGroup>
  ) : null;

  const titleMarkup = isValidElement(title) ? (
    title
  ) : (
    <Text variant="headingSm" as="h2">
      {title}
    </Text>
  );

  const headingMarkup =
    actionMarkup || children ? (
      <InlineStack
        wrap={false}
        gap="200"
        align="space-between"
        blockAlign="center"
      >
        {titleMarkup}
        <InlineStack wrap={false} gap="400" blockAlign="center">
          {actionMarkup}
          {children}
        </InlineStack>
      </InlineStack>
    ) : (
      titleMarkup
    );

  return <div className={styles.Header}>{headingMarkup}</div>;
}
