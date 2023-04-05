import React, {isValidElement} from 'react';

import type {DisableableAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {ButtonGroup} from '../../../ButtonGroup';
import {LegacyStack} from '../../../LegacyStack';
import {Text} from '../../../Text';
import styles from '../../LegacyCard.module.scss';

export interface LegacyCardHeaderProps {
  title?: React.ReactNode;
  actions?: DisableableAction[];
  children?: React.ReactNode;
}

export function Header({children, title, actions}: LegacyCardHeaderProps) {
  const actionMarkup = actions ? (
    <ButtonGroup>{buttonsFrom(actions, {plain: true})}</ButtonGroup>
  ) : null;

  const titleMarkup = isValidElement(title) ? (
    title
  ) : (
    <Text variant="headingMd" as="h2">
      {title}
    </Text>
  );

  const headingMarkup =
    actionMarkup || children ? (
      <LegacyStack alignment="baseline">
        <LegacyStack.Item fill>{titleMarkup}</LegacyStack.Item>
        {actionMarkup}
        {children}
      </LegacyStack>
    ) : (
      titleMarkup
    );

  return <div className={styles.Header}>{headingMarkup}</div>;
}
