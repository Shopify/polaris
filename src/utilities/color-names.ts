export function normalizeName(name: string) {
  return name
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}

export function constructColorName(
  baseName: string,
  property: string | null,
  suffix?: string,
) {
  const name = normalizeName(baseName);
  const propertyName = property ? `-${normalizeName(property)}` : '';
  const constructedSuffix = suffix ? `-${suffix}` : '';

  return `--${name}${propertyName}${constructedSuffix}`;
}
