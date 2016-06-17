export function css(classes) {
  return classes.filter((className) => Boolean(className)).join(' ');
}
