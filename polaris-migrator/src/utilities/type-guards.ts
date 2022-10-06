export function isKeyOf<T extends {[key: string]: any}>(
  obj: T,
  key: PropertyKey | undefined,
): key is keyof T {
  return Object.keys(obj).includes(key as string);
}

export function isValueOf<T extends readonly string[]>(
  arr: T,
  value: string | undefined,
): value is T[number] {
  return arr.includes(value as string);
}
