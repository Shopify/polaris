import React from 'react';

import {DisableableAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import ButtonGroup from '../../../ButtonGroup';
import Stack from '../../../Stack';
import Heading from '../../../Heading';

import styles from '../../Card.scss';

export interface Props {
  title?: React.ReactNode;
  actions?: DisableableAction[];
  children?: React.ReactNode;
}

export default function Header({children, title, actions}: Props) {
  const actionMarkup = actions ? (
    <ButtonGroup>{buttonsFrom(actions, {plain: true})}</ButtonGroup>
  ) : null;

  const titleMarkup = React.isValidElement(title) ? (
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
