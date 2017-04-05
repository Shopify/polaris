import * as React from 'react';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Stack from '../Stack';
import Heading from '../Heading';

import * as styles from './Card.scss';

export interface Action {
  content: React.ReactNode,
  to?: string,
  onClick?(): void,
}

export interface Props {
  children?: React.ReactNode,
  actions?: Action[],
}

export default function Header({children, actions}: Props) {
  const actionMarkup = actions
    ? (
      <ButtonGroup>
        {actions.map((action, index) => (
          <Button
            plain
            key={index}
            to={action.to}
            onClick={action.onClick}
          >
            {action.content}
          </Button>
        ))}
      </ButtonGroup>
    )
    : null;

  const headingMarkup = actions
    ? (
      <Stack alignment="baseline">
        <Stack.Item fill>
          <Heading>{children}</Heading>
        </Stack.Item>

        {actionMarkup}
      </Stack>
    )
    : <Heading>{children}</Heading>;

  return (
    <div className={styles.Header}>
      {headingMarkup}
    </div>
  );
}
