import * as React from 'react';
import {
  TextContainer,
  Heading,
  Link,
  Stack,
  Popover,
  Button,
} from '../../../../../../components';
import {Badge, BadgeProps} from '../../../../..';
import styles from './Message.scss';

export interface Props {
  title: string;
  description: string;
  action: {onClick(): void; content: string};
  link: {to: string; content: string};
  badge?: {content: string; status: BadgeProps['status']};
}

export default function Message({
  title,
  description,
  action,
  link,
  badge,
}: Props) {
  const badgeMarkup = badge && (
    <Badge status={badge.status}>{badge.content}</Badge>
  );

  const {to, content: linkContent} = link;
  const {onClick, content: actionContent} = action;

  return (
    <div className={styles.Section}>
      <Popover.Section>
        <Stack vertical spacing="tight">
          <TextContainer>
            <Heading>
              {title}
              {badgeMarkup}
            </Heading>
            <p>{description}</p>
          </TextContainer>

          <Link url={to}>{linkContent}</Link>

          <Button plain onClick={onClick}>
            {actionContent}
          </Button>
        </Stack>
      </Popover.Section>
    </div>
  );
}
