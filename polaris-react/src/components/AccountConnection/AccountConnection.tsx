import React from 'react';

import {AlphaCard} from '../AlphaCard';
import {AlphaStack} from '../AlphaStack';
import {Avatar} from '../Avatar';
import {buttonFrom} from '../Button';
import {Inline} from '../Inline';
import {SettingAction} from '../SettingAction';
import {Text} from '../Text';
import type {Action} from '../../types';

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

const FakeBox = ({children}: {children: React.ReactNode}) => {
  return <div style={{paddingBlockStart: 'var(--p-space-5)'}}>{children}</div>;
};

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
    <Text variant="bodyMd" color="subdued" as="span">
      {details}
    </Text>
  ) : null;

  const termsOfServiceMarkup = termsOfService ? (
    <FakeBox>{termsOfService}</FakeBox>
  ) : null;

  const actionElement = action
    ? buttonFrom(action, {primary: !connected})
    : null;

  return (
    <AlphaCard>
      <SettingAction action={actionElement}>
        <Inline gap="4">
          {avatarMarkup}
          <AlphaStack gap="2">
            {titleMarkup}
            {detailsMarkup}
          </AlphaStack>
        </Inline>
      </SettingAction>
      {termsOfServiceMarkup}
    </AlphaCard>
  );
}
