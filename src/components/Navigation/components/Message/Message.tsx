import React from 'react';

import Badge, {Props as BadgeProps} from '../../../Badge';
import Button from '../../../Button';
import Heading from '../../../Heading';
import Link from '../../../Link';
import Stack from '../../../Stack';
import TextContainer from '../../../TextContainer';

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

  return (
    <div className={styles.Message}>
      <Stack vertical>
        <TextContainer>
          <Heading>
            {title}
            {badgeMarkup}
          </Heading>
          <p>{description}</p>
        </TextContainer>

        <Link url={link.to}>{link.content}</Link>

        <Button onClick={action.onClick} plain>
          {action.content}
        </Button>
      </Stack>
    </div>
  );
}
