import {useContext} from 'react';

import {
  IndexContext,
  IndexRowContext,
  IndexSelectionChangeContext,
} from './context';

export function useIndexSelectionChange() {
  const onSelectionChange = useContext(IndexSelectionChangeContext);
  if (!onSelectionChange) {
    throw new Error(`Missing IndexProvider context`);
  }
  return onSelectionChange;
}

export function useIndexRow() {
  const indexRow = useContext(IndexRowContext);
  if (!indexRow) {
    throw new Error(`Missing IndexProvider context`);
  }
  return indexRow;
}

export function useIndexValue() {
  const index = useContext(IndexContext);
  if (!index) {
    throw new Error(`Missing IndexProvider context`);
  }
  return index;
}
