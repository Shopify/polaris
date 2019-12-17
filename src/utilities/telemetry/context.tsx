import React from 'react';

export interface TelemetryObject {
  produce(schemaId: string, payload: Record<string, any>): boolean;
}

export const TelemetryContext = React.createContext<
  TelemetryObject | undefined
>(undefined);
