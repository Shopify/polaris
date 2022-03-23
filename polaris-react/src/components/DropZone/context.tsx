import {createContext} from 'react';

import {defaultAllowMultiple} from './utils';

interface DropZoneContextType {
  disabled: boolean;
  focused: boolean;
  measuring: boolean;
  allowMultiple: boolean;
  size: string;
  type: string;
}

export const DropZoneContext = createContext<DropZoneContextType>({
  disabled: false,
  focused: false,
  size: 'extraLarge',
  type: 'file',
  measuring: false,
  allowMultiple: defaultAllowMultiple,
});
