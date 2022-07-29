import type {ReactNode} from 'react';

import {useIsAfterInitialMount} from '../../utilities/use-is-after-initial-mount';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

export function AfterInitialMount({children, fallback = null}: Props) {
  const isMounted = useIsAfterInitialMount();
  const content = isMounted ? children : fallback;

  return <>{content}</>;
}
