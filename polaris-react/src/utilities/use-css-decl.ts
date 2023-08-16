import {useReducer} from 'react';

import {useIsomorphicLayoutEffect} from './use-isomorphic-layout-effect';

export type CSSDeclAction =
  | {
      type: 'updated';
      declValue: string;
      element: Element;
    }
  | {
      type: 'errored';
      error: string;
    };

export interface CSSDeclState {
  prop: string;
  value: string;
  element: Element | null;
  status: 'init' | 'success' | 'error';
  error: string | undefined;
}

function cssDeclReducer(
  state: CSSDeclState,
  action: CSSDeclAction,
): CSSDeclState {
  switch (action.type) {
    case 'updated':
      return {
        ...state,
        status: 'success',
        value: action.declValue.trim(),
        element: action.element,
        error: undefined,
      };
    case 'errored':
      return {
        ...state,
        status: 'error',
        value: '',
        element: null,
        error: action.error,
      };
    default:
      return state;
  }
}

// Derived from https://github.com/JCofman/react-use-css-custom-property/blob/73e89aac1260ec9e120c8b259975cb95735c1171/src/index.tsx#L74
export function useCSSDecl(
  declProp: string,
  selectors = ':root',
): CSSDeclState {
  const [state, dispatch] = useReducer(cssDeclReducer, {
    status: 'init',
    prop: declProp,
    value: '',
    element: null,
    error: undefined,
  });

  useIsomorphicLayoutEffect(() => {
    const element = document.querySelector(selectors);

    if (!element) {
      dispatch({
        type: 'errored',
        error: `No element matching ${selectors}`,
      });
      return;
    }

    const declValue = window
      .getComputedStyle(element)
      .getPropertyValue(declProp);

    if (!declValue) {
      dispatch({
        type: 'errored',
        error: `No CSS declaration value for ${declProp} on ${selectors}`,
      });
      return;
    }

    dispatch({
      type: 'updated',
      declValue,
      element,
    });
  }, [declProp, selectors]);

  return state;
}
