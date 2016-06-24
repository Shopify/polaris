export function css(classes) {
  return classes.filter((className) => Boolean(className)).join(' ');
}

export function variation(name, value) {
  return `${name}${value[0].toUpperCase()}${value.substring(1)}`;
}
