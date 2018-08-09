import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {
  TextContainer,
  Heading,
  Link,
  Stack,
  Button,
} from '../../../../components';
import Badge, {Props as BadgeProps} from '../../../Badge';
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
  const className = classNames(styles.Section, styles.Message);

  const badgeMarkup = badge && (
    <Badge status={badge.status}>{badge.content}</Badge>
  );

  return (
    <div className={className}>
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
