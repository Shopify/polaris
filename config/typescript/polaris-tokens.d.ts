declare module '@shopify/polaris-tokens/formats/utils/color-factory/configs/base' {
  type Lambda = (value: number) => number;

  interface HslaSetting {
    hue?: number | Lambda;
    saturation?: number | Lambda;
    lightness?: number | Lambda;
    alpha?: number;
  }

  interface Variant {
    name: string;
    description?: string;
    light: HslaSetting;
    dark: HslaSetting;
  }

  type Config = Record<string, Variant[]>;

  const content: Config;

  export = content;
}
