import React from 'react';

export interface MonorailObject {
  produce(schemaId: string, payload: Record<string, any>): boolean;
}

export const MonorailContext = React.createContext<MonorailObject | undefined>(
  undefined,
);
