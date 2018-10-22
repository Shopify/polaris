import * as React from 'react';
import {Avatar, buttonFrom, Card, Stack, TextStyle} from 'components';
// eslint-disable-next-line shopify/strict-component-boundaries
import SettingAction from 'components/SettingAction';
import {Action} from 'types';
import * as styles from './AccountConnection.scss';

export interface Props {
  /** Content to display as title */
  title?: React.ReactNode;
  /** Content to display as additional details */
  details?: React.ReactNode;
  /** Content to display as terms of service */
  termsOfService?: React.ReactNode;
  /** The name of the service */
  accountName?: string;
  /** URL for the user’s avatar image */
  avatarUrl?: string;
  /** Set if the account is connected */
  connected?: boolean;
  /** Action for account connection */
  action?: Action;
}

export default function AccountConnection({
  connected = false,
  action,
  avatarUrl,
  accountName = '',
  title,
  details,
  termsOfService,
}: Props) {
  const initials = accountName
    ? accountName
        .split(/\s+/)
        .map((name) => name[0])
        .join('')
    : undefined;

  const avatarMarkup = connected ? (
    <Avatar
      accessibilityLabel=""
      name={accountName}
      initials={initials}
      source={avatarUrl}
    />
  ) : null;

  let titleMarkup: React.ReactNode = null;
  if (title) {
    titleMarkup = <div>{title}</div>;
  } else if (accountName) {
    titleMarkup = <div>{accountName}</div>;
  }

  const detailsMarkup = details ? (
    <div>
      <TextStyle variation="subdued">{details}</TextStyle>
    </div>
  ) : null;

  const termsOfServiceMarkup = termsOfService ? (
    <div className={styles.TermsOfService}>{termsOfService}</div>
  ) : null;

  const actionElement = action
    ? buttonFrom(action, {primary: !connected})
    : null;

  return (
    <Card sectioned>
      <SettingAction action={actionElement}>
        <Stack>
          {avatarMarkup}
          <Stack.Item fill>
            <div className={styles.Content}>
              {titleMarkup}
              {detailsMarkup}
            </div>
          </Stack.Item>
        </Stack>
      </SettingAction>
      {termsOfServiceMarkup}
    </Card>
  );
}
