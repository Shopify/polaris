import React, {useState, useCallback} from 'react';

import {PortalsManagerContext} from './context';

export interface PortalsManagerProviderProps {
  children: React.ReactNode;
}

export function PortalsManagerProvider({
  children,
}: PortalsManagerProviderProps) {
  const [
    portalsContainerRef,
    setPortalsContainerRef,
  ] = useState<HTMLDivElement | null>(null);

  const setContainerNode = useCallback((ref) => {
    setPortalsContainerRef(ref);
  }, []);

  return (
    <PortalsManagerContext.Provider
      value={{
        setContainerNode,
        portalsContainerRef,
      }}
    >
      {children}
    </PortalsManagerContext.Provider>
  );
}
