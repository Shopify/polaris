import React from 'react';

import {Text} from '../../../Text';

interface AppCardPricingInfoProps {
  pricingInfo: string;
  truncate?: boolean;
}

export function AppCardPricingInfo({
  truncate = false,
  pricingInfo,
}: AppCardPricingInfoProps) {
  return (
    <Text truncate={truncate} tone="subdued" variant="bodyMd" as="span">
      {pricingInfo}
    </Text>
  );
}
