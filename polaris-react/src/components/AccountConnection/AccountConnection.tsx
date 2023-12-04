import React from 'react';

import type {Action} from '../../types';
import {Avatar} from '../Avatar';
import {buttonFrom} from '../Button';
import {SettingAction} from '../SettingAction';
import {Card} from '../Card';
import {Box} from '../Box';
import {InlineStack} from '../InlineStack';
import {Text} from '../Text';
import {BlockStack} from '../BlockStack';
import {useBreakpoints} from '../../utilities/breakpoints';

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
  const breakpoints = useBreakpoints();

  const initials = accountName
    ? accountName
        .split(/\s+/)
        .map((name) => name[0])
        .join('')
    : undefined;

  const avatarMarkup = connected ? (
    <span>
      <Avatar
        accessibilityLabel=""
        name={accountName}
        initials={initials}
        source={avatarUrl}
      />
    </span>
  ) : null;

  const titleContent = title ? title : accountName;

  const titleMarkup = (
    <Text as="h2" variant="headingSm">
      {titleContent}
    </Text>
  );

  const detailsMarkup = details ? (
    <Text as="span" tone="subdued">
      {details}
    </Text>
  ) : null;

  const termsOfServiceMarkup = termsOfService ? (
    <Box paddingBlockStart={breakpoints.mdUp ? '400' : '500'}>
      {termsOfService}
    </Box>
  ) : null;

  const actionElement = action
    ? buttonFrom(action, {variant: connected ? undefined : 'primary'})
    : null;

  return (
    <Card>
      <SettingAction action={actionElement}>
        <InlineStack gap="400">
          {avatarMarkup}
          Hello world!
          <BlockStack gap="100">
            {titleMarkup}
            {detailsMarkup}
          </BlockStack>
        </InlineStack>
      </SettingAction>
      {termsOfServiceMarkup}
    </Card>
  );
}
