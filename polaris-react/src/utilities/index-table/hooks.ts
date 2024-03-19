import {useContext} from 'react';

import {RowContext, RowHoveredContext, ScrollContext} from './context';

export function useRowHovered() {
  const hovered = useContext(RowHoveredContext);
  return hovered;
}

export function useRowSelected() {
  const {selected} = useContext(RowContext);
  return selected;
}

export function useRowDisabled() {
  const {disabled} = useContext(RowContext);
  return disabled;
}

export function useContainerScroll() {
  const scrolledContainerRef = useContext(ScrollContext);
  return scrolledContainerRef;
}
