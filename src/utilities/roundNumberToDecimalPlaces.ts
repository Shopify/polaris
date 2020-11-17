// precise rounding https://www.jacklmoore.com/notes/rounding-in-javascript/
export function roundNumberToDecimalPlaces(value: number, decimals: number) {
  const exponent: number = Number(`${value}e${decimals}`);
  const roundedExponent = Math.round(exponent);
  const numberWithDecimalPlaces: number = Number(
    `${roundedExponent}e-${decimals}`,
  );
  return numberWithDecimalPlaces;
}
