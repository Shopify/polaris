export function normalizeName(name: string) {
  return name
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}

export function constructColorName(baseName: string, property: string) {
  const name = normalizeName(baseName);
  const propertyName = property ? `-${normalizeName(property)}` : '';
  return `--${name}${propertyName}`;
}
