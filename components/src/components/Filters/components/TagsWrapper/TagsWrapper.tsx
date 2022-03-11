import React from 'react';

import {VisuallyHidden} from '../../../VisuallyHidden';

interface Props {
  children: React.ReactNode;
  hidden: boolean;
}

export function TagsWrapper({children, hidden}: Props) {
  if (hidden) {
    return <VisuallyHidden>{children}</VisuallyHidden>;
  }

  return <>{children}</>;
}
