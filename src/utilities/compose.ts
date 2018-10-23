export function compose(...fns: any[]) {
  return fns.reduce((func, group) => (...args: any[]) => func(group(...args)));
}
