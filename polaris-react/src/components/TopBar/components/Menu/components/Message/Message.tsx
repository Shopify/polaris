import React from 'react';

import {Badge, BadgeProps} from '../../../../../Badge';
import {Button} from '../../../../../Button';
import {Text} from '../../../../../Text';
import {Link} from '../../../../../Link';
import {Popover} from '../../../../../Popover';
import {Stack} from '../../../../../Stack';
// eslint-disable-next-line import/no-deprecated
import {TextContainer} from '../../../../../TextContainer';

import styles from './Message.scss';

export interface MessageProps {
  title: string;
  description: string;
  action: {onClick(): void; content: string};
  link: {to: string; content: string};
  badge?: {content: string; status: BadgeProps['status']};
}

export function Message({
  title,
  description,
  action,
  link,
  badge,
}: MessageProps) {
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
            <Text variant="headingMd" as="h2">
              {title}
              {badgeMarkup}
            </Text>
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
