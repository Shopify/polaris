export function css(classes) {
  return classes.filter((className) => Boolean(className)).join(' ');
}

// eslint-disable-next-line no-empty-function
export function noop() {}
