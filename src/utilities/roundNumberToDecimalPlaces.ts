// precise rounding https://www.jacklmoore.com/notes/rounding-in-javascript/
export function roundNumberToDecimalPlaces(value: number, decimals: number) {
  // @ts-ignore - string concatenation represents exponential number notation
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
