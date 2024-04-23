import React from 'react';

import {Box} from '../../../Box';
import {InlineStack} from '../../../InlineStack';
import {AppCardBadge, AppCardBadgeEnum} from '../../../AppCardBadge';

interface AppCardBadgesProps {
  signifiers?: string[];
}

export function AppCardBadges({signifiers = []}: AppCardBadgesProps) {
  const badges = [];

  if (signifiers.includes(AppCardBadgeEnum.BuiltForShopify)) {
    badges.push(
      <AppCardBadge
        key={AppCardBadgeEnum.BuiltForShopify}
        type={AppCardBadgeEnum.BuiltForShopify}
      />,
    );
  }

  return badges?.length ? (
    <Box paddingBlockStart="100">
      <InlineStack gap="300">{badges}</InlineStack>
    </Box>
  ) : null;
}
