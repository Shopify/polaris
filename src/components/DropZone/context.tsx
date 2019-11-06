import React from 'react';

interface DropZoneContextType {
  disabled: boolean;
  focused: boolean;
  measuring: boolean;
  size: string;
  type: string;
}

export const DropZoneContext = React.createContext<DropZoneContextType>({
  disabled: false,
  focused: false,
  size: 'extraLarge',
  type: 'file',
  measuring: false,
});
