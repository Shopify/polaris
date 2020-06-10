import {useContext} from 'react';

import {RowHoveredContext} from './context';

export function useRowHovered() {
  const hovered = useContext(RowHoveredContext);
  return hovered;
}
