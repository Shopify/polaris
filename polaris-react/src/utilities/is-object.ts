export function isObjectishOrFunction(
  value?: any,
): value is object | ((...args: unknown[]) => unknown) | unknown[] {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

export function isObject(value?: any): value is object {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}
