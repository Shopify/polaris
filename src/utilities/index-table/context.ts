import {createContext} from 'react';

interface RowContextType {
  itemId?: string;
  selected?: boolean;
  onInteraction?: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

export const RowContext = createContext<RowContextType>({});

export const RowHoveredContext = createContext<boolean | undefined>(undefined);
