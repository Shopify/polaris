import * as React from 'react';

import {DisableableAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import ButtonGroup from '../../../ButtonGroup';
import Stack from '../../../Stack';
import Heading from '../../../Heading';

import * as styles from '../../Card.scss';

export interface Props {
  children?: React.ReactNode;
  actions?: DisableableAction[];
}

export default function Header({children, actions}: Props) {
  const actionMarkup = actions ? (
    <ButtonGroup>{buttonsFrom(actions, {plain: true})}</ButtonGroup>
  ) : null;

  const childrenMarkup = React.isValidElement(children) ? (
    children
  ) : (
    <Heading>{children}</Heading>
  );

  const headingMarkup = actionMarkup ? (
    <Stack alignment="baseline">
      <Stack.Item fill>{childrenMarkup}</Stack.Item>

      {actionMarkup}
    </Stack>
  ) : (
    childrenMarkup
  );

  return <div className={styles.Header}>{headingMarkup}</div>;
}
