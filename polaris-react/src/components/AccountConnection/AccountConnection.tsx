import React from 'react';

import type {Action} from '../../types';
import {Avatar} from '../Avatar';
import {buttonFrom} from '../Button';
import {SettingAction} from '../SettingAction';
import {Card} from '../Card';
import {Box} from '../Box';
import {Inline} from '../Inline';
import {Text} from '../Text';
import {Stack} from '../Stack';

export interface AccountConnectionProps {
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

export function AccountConnection({
  connected = false,
  action,
  avatarUrl,
  accountName = '',
  title,
  details,
  termsOfService,
}: AccountConnectionProps) {
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

  const titleMarkup = title ? title : accountName;

  const detailsMarkup = details ? (
    <Text as="span" color="subdued">
      {details}
    </Text>
  ) : null;

  const termsOfServiceMarkup = termsOfService ? (
    <Box paddingBlockStart="5">{termsOfService}</Box>
  ) : null;

  const actionElement = action
    ? buttonFrom(action, {primary: !connected})
    : null;

  return (
    <Card>
      <SettingAction action={actionElement}>
        <Inline gap="4">
          {avatarMarkup}
          <Stack gap="2">
            {titleMarkup}
            {detailsMarkup}
          </Stack>
        </Inline>
      </SettingAction>
      {termsOfServiceMarkup}
    </Card>
  );
}
