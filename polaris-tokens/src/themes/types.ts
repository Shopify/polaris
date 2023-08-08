import type {ThemeBase} from './base';

export interface TokenProperties {
  value: string;
  description?: string;
}

export interface TokenGroupShape {
  [tokenName: string]: TokenProperties;
}

export interface ThemeShape {
  [tokenGroupName: string]: TokenGroupShape;
}

export type ThemeVariantPartialShape = {
  [TokenGroupName in keyof Omit<ThemeBase, 'breakpoints'>]?: {
    [TokenName in keyof ThemeBase[TokenGroupName]]?: TokenProperties;
  };
};
