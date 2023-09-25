import {createContext} from 'react';

interface MappedActionContextType {
  role?: string;
  url?: string;
  external?: boolean;
  onAction?(): void;
  destructive?: boolean;
  closeOnClick?: boolean;
}

export const MappedActionContext = createContext<MappedActionContextType>({});
