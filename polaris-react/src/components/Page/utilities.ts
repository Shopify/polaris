import {isValidElement} from 'react';

export function isInterface<T>(x: T | React.ReactNode): x is T {
  return !isValidElement(x) && x !== undefined;
}

export function isReactElement<T>(x: T): x is T {
  return isValidElement(x) && x !== undefined;
}
