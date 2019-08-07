import React from 'react';

interface DropZoneContextType {
  size: string;
  type: string;
}

export const DropZoneContext = React.createContext<DropZoneContextType>({
  size: 'extraLarge',
  type: 'file',
});
