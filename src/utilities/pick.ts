import {GeneralObject, TypeOf} from '../types';

function pickValueAndLength(obj: GeneralObject, key: string) {
  const keyPaths = key.split('.');
  let value = obj;
  for (const key of keyPaths) {
    if (!value.hasOwnProperty(key)) {
      return null;
    }

    value = value[key];
  }

  return {keyPaths, value};
}

function pick(obj: GeneralObject | null, ...keyPaths: (string | string[])[]) {
  const flattenedKeypaths = ([] as string[]).concat(...keyPaths);
  if (obj == null || flattenedKeypaths.length === 0) return {};
  return flattenedKeypaths.reduce((acc, key) => {
    if (typeof key !== TypeOf.String || obj.hasOwnProperty(key)) {
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

export default pick;
