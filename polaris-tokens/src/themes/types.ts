export interface TokenProperties {
  value: string;
  valueExperimental?: string;
  description?: string;
}

export interface TokenGroupShape {
  [tokenName: string]: TokenProperties;
}

export interface ThemeShape {
  [tokenGroupName: string]: TokenGroupShape;
}

export type DeepPartial<T> = T extends object
  ? {[K in keyof T]?: DeepPartial<T[K]>}
  : T;
