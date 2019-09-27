import React from 'react';
import {Settings} from './types';

export const SettingsContext = React.createContext<Settings | undefined>(
  undefined,
);
