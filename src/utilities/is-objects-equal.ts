type Obj = {[key: string]: any} | undefined;

export function isObjectsEqual(objA: Obj, objB: Obj, map = new WeakMap()) {
  if (objA === undefined || objB === undefined) {
    return objA === undefined && objB === undefined;
  }
  let result = true;

  for (const prop in objA) {
    if (!objA.hasOwnProperty(prop)) continue;
    const propA = objA[prop];
    const propB = objB[prop];
    const type = typeof propA;

    if (type === 'object') {
      const mapped = map.get(objA);
      if (mapped && map.get(objB)) {
        return mapped === objB;
      }

      map.set(objA, objB);
      map.set(objB, objA);

      if (!isObjectsEqual(propA, propB, map)) {
        result = false;
      }
    } else if (propA !== propB) {
      result = false;
    }

    if (!result) break;
  }

  if (result) {
    for (const prop in objB) {
      if (
        typeof objA[prop] === 'undefined' &&
        typeof objB[prop] !== 'undefined'
      ) {
        result = false;
      }
    }
  }

  map.delete(objA);
  map.delete(objB);

  return result;
}
