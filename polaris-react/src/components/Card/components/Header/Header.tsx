import React, {isValidElement} from 'react';

import type {DisableableAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {ButtonGroup} from '../../../ButtonGroup';
import {LegacyStack} from '../../../LegacyStack';
import {Text} from '../../../Text';
import styles from '../../Card.scss';

export interface CardHeaderProps {
  title?: React.ReactNode;
  actions?: DisableableAction[];
  children?: React.ReactNode;
}

/** @deprecated Use LegacyCard or AlphaCard instead. */
export function Header({children, title, actions}: CardHeaderProps) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: <Card /> is deprecated. This component will be removed in a future major version of Polaris. Use <LegacyCard /> or <AlphaCard /> instead.',
    );
  }

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
