export interface MetadataTokenProperties {
  description?: string;
  value: string;
  valueExperimental?: string;
}

export interface MetadataTokenGroupShape {
  [tokenName: string]: MetadataTokenProperties;
}

export type MetadataThemeBaseShape = Omit<MetadataThemeVariantShape, 'color'>;

export interface MetadataThemeVariantShape {
  breakpoints: MetadataTokenGroupShape;
  border: MetadataTokenGroupShape;
  color: MetadataTokenGroupShape;
  font: MetadataTokenGroupShape;
  motion: MetadataTokenGroupShape;
  shadow: MetadataTokenGroupShape;
  space: MetadataTokenGroupShape;
  zIndex: MetadataTokenGroupShape;
}

export type MetadataThemePartialShape = Partial<MetadataThemeVariantShape>;
