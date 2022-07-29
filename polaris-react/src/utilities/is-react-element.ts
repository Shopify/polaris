import {isValidElement} from 'react';

export function isReactElement<T>(x: T): x is T {
  return isValidElement(x) && x !== undefined;
}
