import React, {ReactNode, useEffect} from 'react';

import {useIsAfterInitialMount} from '../../utilities/use-is-after-initial-mount';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onMount?: () => void;
}

export function AfterInitialMount({children, onMount, fallback = null}: Props) {
  const isMounted = useIsAfterInitialMount();
  const content = isMounted ? children : fallback;

  useEffect(() => {
    if (isMounted && onMount) {
      onMount();
    }
  }, [isMounted, onMount]);

  return <>{content}</>;
}
