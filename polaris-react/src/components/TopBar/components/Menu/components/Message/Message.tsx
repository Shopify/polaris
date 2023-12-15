import React from 'react';

import {Badge} from '../../../../../Badge';
import type {BadgeProps} from '../../../../../Badge';
import {Button} from '../../../../../Button';
import {Text} from '../../../../../Text';
import {Link} from '../../../../../Link';
import {Popover} from '../../../../../Popover';
// eslint-disable-next-line import/no-deprecated
import {LegacyStack} from '../../../../../LegacyStack';
// eslint-disable-next-line import/no-deprecated
import {TextContainer} from '../../../../../TextContainer';

import styles from './Message.module.scss';

export interface MessageProps {
  title: string;
  description: string;
  action: {onClick(): void; content: string};
  link: {to: string; content: string};
  badge?: {content: string; tone: BadgeProps['tone']};
}

export function Message({
  title,
  description,
  action,
  link,
  badge,
}: MessageProps) {
  const badgeMarkup = badge && <Badge tone={badge.tone}>{badge.content}</Badge>;

  const {to, content: linkContent} = link;
  const {onClick, content: actionContent} = action;

  return (
    <div className={styles.Section}>
      <Popover.Section>
        <LegacyStack vertical spacing="tight">
          <TextContainer>
            <Text variant="headingMd" as="h2">
              {title}
              {badgeMarkup}
            </Text>
            <p>{description}</p>
          </TextContainer>

          <Link url={to}>{linkContent}</Link>

          <Button variant="plain" onClick={onClick}>
            {actionContent}
          </Button>
        </LegacyStack>
      </Popover.Section>
    </div>
  );
}
