import React from 'react';

interface RowContextType {
  itemId?: string;
  selected?: boolean;
  onInteraction?: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

export const RowContext = React.createContext<RowContextType>({});

export const RowHoveredContext = React.createContext<boolean | undefined>(
  undefined,
);
