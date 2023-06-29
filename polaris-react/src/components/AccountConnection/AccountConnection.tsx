import React from 'react';

import type {Action} from '../../types';
import {Avatar} from '../Avatar';
import {buttonFrom} from '../Button';
import {SettingAction} from '../SettingAction';
import {Card} from '../Card';
import {Box} from '../Box';
import {HorizontalStack} from '../HorizontalStack';
import {Text} from '../Text';
import {VerticalStack} from '../VerticalStack';
import {useFeatures} from '../../utilities/features';
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
  const {polarisSummerEditions2023} = useFeatures();
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

  const titleMarkup = polarisSummerEditions2023 ? (
    <Text as="h2" variant="headingSm">
      {titleContent}
    </Text>
  ) : (
    titleContent
  );

  const detailsMarkup = details ? (
    <Text as="span" color="subdued">
      {details}
    </Text>
  ) : null;

  const termsOfServiceMarkup = termsOfService ? (
    <Box
      paddingBlockStart={
        polarisSummerEditions2023 && breakpoints.mdUp ? '4' : '5'
      }
    >
      {termsOfService}
    </Box>
  ) : null;

  const actionElement = action
    ? buttonFrom(action, {primary: !connected})
    : null;

  return (
    <Card>
      <SettingAction action={actionElement}>
        <HorizontalStack gap="4">
          {avatarMarkup}
          <VerticalStack gap={polarisSummerEditions2023 ? '1' : '2'}>
            {titleMarkup}
            {detailsMarkup}
          </VerticalStack>
        </HorizontalStack>
      </SettingAction>
      {termsOfServiceMarkup}
    </Card>
  );
}
