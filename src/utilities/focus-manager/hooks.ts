import {useContext, useMemo, useEffect} from 'react';

import {useUniqueId} from '../unique-id';
import {MissingAppProviderError} from '../errors';

import {FocusManagerContext} from './context';

interface Options {
  trapping: boolean;
}

export function useFocusManager({trapping}: Options) {
  const focusManager = useContext(FocusManagerContext);
  const id = useUniqueId();

  if (!focusManager) {
    throw new MissingAppProviderError('No FocusManager was provided.');
  }

  const {
    trapFocusList,
    add: addFocusItem,
    remove: removeFocusItem,
  } = focusManager;
  const canSafelyFocus = trapFocusList[0] === id;

  const value = useMemo(() => ({canSafelyFocus}), [canSafelyFocus]);

  useEffect(() => {
    if (!trapping) return;
    addFocusItem(id);
    return () => {
      removeFocusItem(id);
    };
  }, [addFocusItem, id, removeFocusItem, trapping]);

  return value;
}
