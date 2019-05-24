import React from 'react';

export interface DropZoneContextType {
  size: string;
  type: string;
}

const DropZoneContext = React.createContext<DropZoneContextType>({
  size: 'extraLarge',
  type: 'file',
});

export default DropZoneContext;
