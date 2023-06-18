import React from 'react';

import {Badge, BadgeProps} from '../../../../../../../Badge';
import {Button} from '../../../../../../../Button';
import {Heading} from '../../../../../../../Heading';
import {Link} from '../../../../../../../Link';
import {Popover} from '../../../../../../../Popover';
import {Stack} from '../../../../../../../Stack';
import {TextContainer} from '../../../../../../../TextContainer';

import styles from './Message.scss';

export interface MessageProps {
  title: string;
  action: {onClick(): void; content: string};
  link?: {to: string; content: string};
  badge?: {content: string; status: BadgeProps['status']};
}

export function Message({title, action, link, badge}: MessageProps) {
  const badgeMarkup = badge && (
    <Badge status={badge.status}>{badge.content}</Badge>
  );

  const linkMarkup = link && <Link url={link.to}>{link.content}</Link>;

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
          </TextContainer>

          {linkMarkup}

          <Button plain onClick={onClick}>
            {actionContent}
          </Button>
        </Stack>
      </Popover.Section>
    </div>
  );
}
