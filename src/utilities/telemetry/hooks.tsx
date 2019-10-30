import React from 'react';
import {TelemetryContext} from './context';

function noop() {}

export function useTelemetry() {
  return React.useContext(TelemetryContext) || {produce: noop};
}
