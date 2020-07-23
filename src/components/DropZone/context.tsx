import {createContext} from 'react';

interface DropZoneContextType {
  disabled: boolean;
  focused: boolean;
  measuring: boolean;
  size: string;
  type: string;
}

export const DropZoneContext = createContext<DropZoneContextType>({
  disabled: false,
  focused: false,
  size: 'extraLarge',
  type: 'file',
  measuring: false,
});
