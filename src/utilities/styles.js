// @flow

export function css(classes: Array<string | ?boolean>) {
  return classes.filter((className) => Boolean(className)).join(' ');
}

export function variation(name: string, value: string) {
  return `${name}${value[0].toUpperCase()}${value.substring(1)}`;
}
