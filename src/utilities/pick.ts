import {GeneralObject, TypeOf} from '../types';

function pickValueAndLength(obj: GeneralObject, key: string) {
  const keyPaths = key.split('.');
  let value = obj;
  for (const key of keyPaths) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) {
      return null;
    }

    value = value[key];
  }

  return {keyPaths, value};
}

export function pick(
  obj: GeneralObject | null,
  ...keyPaths: (string | string[])[]
) {
  const flattenedKeypaths = ([] as string[]).concat(...keyPaths);
  if (obj == null || flattenedKeypaths.length === 0) return {};
  return flattenedKeypaths.reduce((acc, key) => {
    if (
      typeof key !== TypeOf.String ||
      Object.prototype.hasOwnProperty.call(obj, key)
    ) {
      return {...acc, [key]: obj[key]};
    }

    const pickedValues = pickValueAndLength(obj, key);
    if (pickedValues === null) {
      return acc;
    }

    const {keyPaths, value} = pickedValues;
    let len = keyPaths.length;
    let innerObject = {[keyPaths[--len]]: value};
    while (len--) {
      innerObject = {[keyPaths[len]]: innerObject};
    }

    return {...acc, ...innerObject};
  }, {});
}
