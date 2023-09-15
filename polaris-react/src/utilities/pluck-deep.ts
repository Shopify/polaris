import {isObjectishOrFunction} from './is-object';

export function pluckDeep(obj: {[key: string]: any} | null, key: string): any {
  if (!obj) {
    return null;
  }

  const keys = Object.keys(obj);
  for (const currKey of keys) {
    if (currKey === key) {
      return obj[key];
    }

    if (isObjectishOrFunction(obj[currKey])) {
      const plucked = pluckDeep(obj[currKey], key);
      if (plucked) {
        return plucked;
      }
    }
  }

  return null;
}
