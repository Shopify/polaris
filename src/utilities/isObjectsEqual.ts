import {GeneralObject, TypeOf} from '../types';

export type Obj = GeneralObject | undefined;

function isObjectsEqual(objA: Obj, objB: Obj) {
  if (objA === undefined || objB === undefined) {
    return objA === undefined && objB === undefined;
  }

  for (const prop in objA) {
    if (!objA.hasOwnProperty(prop)) continue;
    const propA = objA[prop];
    const propB = objB[prop];

    switch (typeof propA) {
      case TypeOf.Object:
        if (!isObjectsEqual(propA, propB)) {
          return false;
        }
        break;
      case TypeOf.Function:
        if (propB == null || !compareFunction(propA, propB)) {
          return false;
        }
        break;
      default:
        if (propA !== propB) {
          return false;
        }
    }
  }

  for (const prop in objB) {
    if (
      typeof objA[prop] === TypeOf.Undefined &&
      typeof objB[prop] !== TypeOf.Undefined
    ) {
      return false;
    }
  }

  return true;
}

function compareFunction(funcA: Function, funcB: Function) {
  return funcA.toString() === funcB.toString();
}

export default isObjectsEqual;
