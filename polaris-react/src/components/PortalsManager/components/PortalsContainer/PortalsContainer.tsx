import React, {forwardRef, RefObject} from 'react';

import {useUniqueId} from '../../../../utilities/unique-id';

export interface PolarisContainerProps {}

function PortalsContainerComponent(
  _props: PolarisContainerProps,
  ref: RefObject<HTMLDivElement>,
) {
  const uniqueId = useUniqueId('PortalsContainer');

  return <div id={uniqueId} ref={ref} />;
}

export const PortalsContainer = forwardRef(PortalsContainerComponent);
