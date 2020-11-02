import React, {useContext} from 'react';

import {PortalsManagerContext} from './context';

export function PortalsContainer() {
  const portalsManagerContext = useContext(PortalsManagerContext);

  if (!portalsManagerContext) {
    return null;
  }

  const {setContainerNode} = portalsManagerContext;

  return <div id="PolarisPortalsContainer" ref={setContainerNode} />;
}
