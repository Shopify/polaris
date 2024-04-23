import React, {useCallback, useRef, useEffect} from 'react';

import {useEventListener} from '../../../../utilities/use-event-listener';

export interface AppCardMeasurements {
  containerWidth: number;
}

export interface AppCardMeasurerProps {
  children: React.ReactElement;
  handleMeasurement(measurements: AppCardMeasurements): void;
}

export function AppCardMeasurer({
  children,
  handleMeasurement: handleMeasurementProp,
}: AppCardMeasurerProps) {
  const containerNode = useRef<HTMLDivElement>(null);

  const handleMeasurement = useCallback(() => {
    if (!containerNode.current) {
      return;
    }

    const containerWidth = containerNode.current.offsetWidth;

    handleMeasurementProp({
      containerWidth,
    });
  }, [handleMeasurementProp]);

  useEffect(() => {
    handleMeasurement();
  }, [handleMeasurement]);

  useEventListener('resize', handleMeasurement);

  return <div ref={containerNode}>{children}</div>;
}
