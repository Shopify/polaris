export function compose(...fns: any[]) {
  return fns.reduce((f, g) => (...args: any[]) => f(g(...args)));
}
