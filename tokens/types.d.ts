/**
 * Values to convert to CSS custom properties.
 * @example {background: '#000'} // --p-background: #000;
 */
export interface TokenGroup {
  [token: string]: string;
}

// Note: Casting all JSON files is safe because we validate each token group with `json-schema`.
declare module './*.json' {
  const tokenGroup: TokenGroup;

  // eslint-disable-next-line import/no-default-export
  export default tokenGroup;
}
