import React from 'react';

import {Size} from './types';

interface DropZoneContextType {
  disabled: boolean;
  focused: boolean;
  measuring: boolean;
  size: Size;
  type: string;
}

export const DropZoneContext = React.createContext<DropZoneContextType>({
  disabled: false,
  focused: false,
  size: Size.ExtraLarge,
  type: 'file',
  measuring: false,
});
