import React from 'react';

import {Text} from '../../../Text';

interface AppCardDescriptionProps {
  description: string;
}

export function AppCardDescription({description}: AppCardDescriptionProps) {
  return (
    <Text tone="subdued" variant="bodyMd" as="span">
      {description}
    </Text>
  );
}
