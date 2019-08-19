import {useRef} from 'react';

export function createUseIdFactory(prefix?: string) {
  let i = 0;
  return function useId(id?: string) {
    const generatedId = useRef(`${prefix}${i++}`);
    return id || generatedId.current;
  };
}
