// Unfortunately, this is how we have to type this at the moment.
// There is currently a proposal to support variadic kinds.
// https://github.com/Microsoft/TypeScript/issues/5453
export function merge<TSource1, TSource2>(
  source1: TSource1,
  source2: TSource2,
): TSource1 & TSource2;
export function merge<TSource1, TSource2, TSource3>(
  source1: TSource1,
  source2: TSource2,
  source3: TSource3,
): TSource1 & TSource2 & TSource3;
export function merge<TSource1, TSource2, TSource3, TSource4>(
  source1: TSource1,
  source2: TSource2,
  source3: TSource3,
  source4: TSource4,
): TSource1 & TSource2 & TSource3 & TSource4;
export function merge<TSource1, TSource2, TSource3, TSource4, TSource5>(
  source1: TSource1,
  source2: TSource2,
  source3: TSource3,
  source4: TSource4,
  source5: TSource5,
): TSource1 & TSource2 & TSource3 & TSource4 & TSource5;
export function merge<TResult>(...objs: any[]): TResult;
export function merge<TSource1, TSource2, TSource3, TSource4, TSource5>(
  ...objs: (TSource1 | TSource2 | TSource3 | TSource4 | TSource5)[]
) {
  let final = {};

  for (const obj of objs) {
    final = mergeRecursively(final, obj as any);
  }

  return final;
}

interface GeneralObject {
  [key: string]: any;
}

function mergeRecursively(inputObjA: GeneralObject, objB: GeneralObject) {
  const objA: GeneralObject = Array.isArray(inputObjA)
    ? [...inputObjA]
    : {...inputObjA};
  for (const key in objB) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
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
