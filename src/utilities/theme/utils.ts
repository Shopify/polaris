type CustomPropertiesObject = Record<string, string>;

export function toString(obj?: CustomPropertiesObject) {
  if (obj) {
    return Object.entries(obj)
      .map((pair) => pair.join(':'))
      .join(';');
  } else {
    return '';
  }
}

export function toCssCustomPropertySyntax(camelCase: string) {
  return `--p-${camelCase.replace(/([A-Z]|[0-9]+)/g, '-$1').toLowerCase()}`;
}
