// precise rounding https://www.jacklmoore.com/notes/rounding-in-javascript/
export function roundNumberToDecimalPlaces(value: number, decimals: number) {
  const exponent = Number(`${value}e${decimals}`);
  const roundedExponent = Math.round(exponent);
  const numberWithDecimalPlaces = Number(`${roundedExponent}e-${decimals}`);
  return numberWithDecimalPlaces;
}
