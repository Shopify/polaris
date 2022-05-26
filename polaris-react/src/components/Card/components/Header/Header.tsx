import React, {isValidElement} from 'react';

import type {DisableableAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {ButtonGroup} from '../../../ButtonGroup';
import {Stack} from '../../../Stack';
import {Heading} from '../../../Heading';
import styles from '../../Card.scss';

export interface CardHeaderProps {
  title?: React.ReactNode;
  actions?: DisableableAction[];
  children?: React.ReactNode;
}

export function Header({children, title, actions}: CardHeaderProps) {
  const actionMarkup = actions ? (
    <ButtonGroup>
      {buttonsFrom(actions, {plain: true, textAlign: 'right'})}
    </ButtonGroup>
  ) : null;

  const titleMarkup = isValidElement(title) ? (
    title
  ) : (
    <Heading>{title}</Heading>
  );

  const headingMarkup =
    actionMarkup || children ? (
      <Stack alignment="baseline" wrap={false}>
        <Stack.Item fill>{titleMarkup}</Stack.Item>
        <Stack.Item fill>
          <div className={styles.Action}>{actionMarkup}</div>
        </Stack.Item>
        {children}
      </Stack>
    ) : (
      titleMarkup
    );

  return <div className={styles.Header}>{headingMarkup}</div>;
}
