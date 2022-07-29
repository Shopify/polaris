import type {ReactNode} from 'react';
import {isValidElement} from 'react';

import type {DisableableAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {ButtonGroup} from '../../../ButtonGroup';
import {Stack} from '../../../Stack';
import {Heading} from '../../../Heading';
import styles from '../../Card.scss';

export interface CardHeaderProps {
  title?: ReactNode;
  actions?: DisableableAction[];
  children?: ReactNode;
}

export function Header({children, title, actions}: CardHeaderProps) {
  const actionMarkup = actions ? (
    <ButtonGroup>{buttonsFrom(actions, {plain: true})}</ButtonGroup>
  ) : null;

  const titleMarkup = isValidElement(title) ? (
    title
  ) : (
    <Heading>{title}</Heading>
  );

  const headingMarkup =
    actionMarkup || children ? (
      <Stack alignment="baseline">
        <Stack.Item fill>{titleMarkup}</Stack.Item>
        {actionMarkup}
        {children}
      </Stack>
    ) : (
      titleMarkup
    );

  return <div className={styles.Header}>{headingMarkup}</div>;
}
