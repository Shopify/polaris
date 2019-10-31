import React from 'react';
import {TelemetryContext} from './context';

function noop() {}
const defaultTelemetry = {produce: noop};

export function useTelemetry() {
  return React.useContext(TelemetryContext) || defaultTelemetry;
}
