import React from 'react';
import {StarFilledIcon} from '@shopify/polaris-icons';

import {InlineStack} from '../../../InlineStack';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';

export interface AppCardStarRatingProps {
  starRating: number;
}

export function AppCardStarRating({starRating}: AppCardStarRatingProps) {
  return (
    <InlineStack wrap={false} blockAlign="center">
      <Text tone="subdued" variant="bodyMd" as="span">
        {starRating}
      </Text>
      <div>
        <Icon tone="success" source={StarFilledIcon} />
      </div>
    </InlineStack>
  );
}
