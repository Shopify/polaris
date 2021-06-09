import {createContext} from 'react';

interface MappedActionContextType {
  role?: string;
  url?: string;
  external?: boolean;
  onAction?(): void;
  destructive?: boolean;
  isAction: boolean;
}

export const MappedActionContext = createContext<MappedActionContextType>({
  isAction: false,
});
