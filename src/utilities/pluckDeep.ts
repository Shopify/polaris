import isObject from 'lodash/isObject';

export function pluckDeep(obj: {[key: string]: any} | null, key: string): any {
  if (!obj) {
    return null;
  }

  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const currKey = keys[i];
    if (currKey === key) {
      return obj[key];
    }

    if (isObject(obj[currKey])) {
      const plucked = pluckDeep(obj[currKey], key);
      if (plucked) {
        return plucked;
      }
    }
  }

  return null;
}
