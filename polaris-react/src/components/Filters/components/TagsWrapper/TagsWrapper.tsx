import React from 'react';

import {Text} from '../../../Text';

interface Props {
  children: React.ReactNode;
  hidden: boolean;
}

export function TagsWrapper({children, hidden}: Props) {
  if (hidden) {
    return (
      <Text variant="bodySm" as="span" visuallyHidden>
        {children}
      </Text>
    );
  }

  return <>{children}</>;
}
