import {GeneralObject} from '../types';

export default function merge(...objs: GeneralObject[]) {
  const final = {};

  for (const obj of objs) {
    mergeRecursively(final, obj);
  }

  return final;
}

function mergeRecursively(objA: GeneralObject, objB: GeneralObject) {
  for (const key in objB) {
    if (!objB.hasOwnProperty(key)) {
      continue;
    } else if (isMergeableValue(objB[key]) && isMergeableValue(objA[key])) {
      objA[key] = mergeRecursively(objA[key], objB[key]);
    } else {
      objA[key] = objB[key];
    }
  }

  return objA;
}

function isMergeableValue(value: any) {
  return value !== null && typeof value === 'object';
}
