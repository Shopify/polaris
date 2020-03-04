import roleVariants from '@shopify/polaris-tokens/formats/utils/color-factory/configs/base';
import {toCssCustomPropertySyntax, Tokens} from '../theme';

export const nonDesignLangaugeCustomProperties = [
  '--global-ribbon-height',
  '--top-bar-background',
  '--Polaris-RangeSlider-progress-lower',
  '--Polaris-RangeSlider-progress-upper',
  '--Polaris-RangeSlider-progress',
  '--Polaris-RangeSlider-output-factor',
  '--top-bar-color',
  '--top-bar-background-lighter',
];

export const designLangaugeCustomProperties = ([] as string[]).concat(
  ...Object.values(roleVariants).map((variant) =>
    variant.map(({name}) => toCssCustomPropertySyntax(name)),
  ),
  ...Object.keys(Tokens).map(toCssCustomPropertySyntax),
);
