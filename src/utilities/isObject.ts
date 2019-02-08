import {TypeOf} from '../types';

function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === TypeOf.Object || type === TypeOf.Function);
}

export default isObject;
