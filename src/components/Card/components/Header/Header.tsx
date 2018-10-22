import * as React from 'react';
import {DisableableAction} from 'types';
import {ButtonGroup, Stack, Heading, buttonsFrom} from 'components';
import * as styles from '../../Card.scss';

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
