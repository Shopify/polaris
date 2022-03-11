// Because everything is a float in JS, Number.toFixed sometimes rounds in the
// "wrong" direction because of float imprecision. For instance:
// `(1.005).toFixed(2)` is `1.00`, NOT `1.01` because 1.005 in floating point is
// actually 1.004999995. By using exponentiation tricks here we can work around
// this imprecision, so `roundNumberToDecimalPlaces(1.005)` returns the expected
// value of `1.01`
// See https://www.jacklmoore.com/notes/rounding-in-javascript/
export function roundNumberToDecimalPlaces(value: number, decimals: number) {
  const exponent = Number(`${value}e${decimals}`);
  const roundedExponent = Math.round(exponent);
  const numberWithDecimalPlaces = Number(`${roundedExponent}e-${decimals}`);
  return numberWithDecimalPlaces;
}
