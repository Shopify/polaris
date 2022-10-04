export function isKeyof<T extends {[key: string]: any}>(
  obj: T,
  key: PropertyKey | undefined,
): key is keyof T {
  return Object.keys(obj).includes(key as string);
}
