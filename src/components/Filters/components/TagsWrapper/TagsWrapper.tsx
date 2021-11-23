import type {ReactNode} from 'react';

import {VisuallyHidden} from '../../../VisuallyHidden';

interface Props {
  children: ReactNode;
  hidden: boolean;
}

export function TagsWrapper({children, hidden}: Props) {
  if (hidden) {
    return <VisuallyHidden>{children}</VisuallyHidden>;
  }

  return <>{children}</>;
}
