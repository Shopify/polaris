import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-text-heading-3xl-font-family': '--p-font-family-sans',
    '--p-text-heading-3xl-font-size': '--p-font-size-750',
    '--p-text-heading-3xl-font-weight': '--p-font-weight-bold',
    '--p-text-heading-3xl-font-letter-spacing':
      '--p-font-letter-spacing-denser',
    '--p-text-heading-3xl-font-line-height': '--p-font-line-height-1000',
    '--p-text-heading-2xl-font-family': '--p-font-family-sans',
    '--p-text-heading-2xl-font-size': '--p-font-size-750',
    '--p-text-heading-2xl-font-weight': '--p-font-weight-bold',
    '--p-text-heading-2xl-font-letter-spacing':
      '--p-font-letter-spacing-denser',
    '--p-text-heading-2xl-font-line-height': '--p-font-line-height-1000',
    '--p-text-heading-xl-font-family': '--p-font-family-sans',
    '--p-text-heading-xl-font-size': '--p-font-size-600',
    '--p-text-heading-xl-font-weight': '--p-font-weight-bold',
    '--p-text-heading-xl-font-letter-spacing': '--p-font-letter-spacing-dense',
    '--p-text-heading-xl-font-line-height': '--p-font-line-height-800',
    '--p-text-heading-lg-font-family': '--p-font-family-sans',
    '--p-text-heading-lg-font-size': '--p-font-size-500',
    '--p-text-heading-lg-font-weight': '--p-font-weight-semibold',
    '--p-text-heading-lg-font-letter-spacing': '--p-font-letter-spacing-dense',
    '--p-text-heading-lg-font-line-height': '--p-font-line-height-600',
    '--p-text-heading-md-font-family': '--p-font-family-sans',
    '--p-text-heading-md-font-size': '--p-font-size-350',
    '--p-text-heading-md-font-weight': '--p-font-weight-semibold',
    '--p-text-heading-md-font-letter-spacing': '--p-font-letter-spacing-normal',
    '--p-text-heading-md-font-line-height': '--p-font-line-height-500',
    '--p-text-heading-sm-font-family': '--p-font-family-sans',
    '--p-text-heading-sm-font-size': '--p-font-size-325',
    '--p-text-heading-sm-font-weight': '--p-font-weight-semibold',
    '--p-text-heading-sm-font-letter-spacing': '--p-font-letter-spacing-normal',
    '--p-text-heading-sm-font-line-height': '--p-font-line-height-500',
    '--p-text-heading-xs-font-family': '--p-font-family-sans',
    '--p-text-heading-xs-font-size': '--p-font-size-300',
    '--p-text-heading-xs-font-weight': '--p-font-weight-semibold',
    '--p-text-heading-xs-font-letter-spacing': '--p-font-letter-spacing-normal',
    '--p-text-heading-xs-font-line-height': '--p-font-line-height-400',
    '--p-text-body-lg-font-family': '--p-font-family-sans',
    '--p-text-body-lg-font-size': '--p-font-size-350',
    '--p-text-body-lg-font-weight': '--p-font-weight-regular',
    '--p-text-body-lg-font-letter-spacing': '--p-font-letter-spacing-normal',
    '--p-text-body-lg-font-line-height': '--p-font-line-height-500',
    '--p-text-body-md-font-family': '--p-font-family-sans',
    '--p-text-body-md-font-size': '--p-font-size-325',
    '--p-text-body-md-font-weight': '--p-font-weight-regular',
    '--p-text-body-md-font-letter-spacing': '--p-font-letter-spacing-normal',
    '--p-text-body-md-font-line-height': '--p-font-line-height-500',
    '--p-text-body-sm-font-family': '--p-font-family-sans',
    '--p-text-body-sm-font-size': '--p-font-size-300',
    '--p-text-body-sm-font-weight': '--p-font-weight-regular',
    '--p-text-body-sm-font-letter-spacing': '--p-font-letter-spacing-normal',
    '--p-text-body-sm-font-line-height': '--p-font-line-height-400',
    '--p-text-body-xs-font-family': '--p-font-family-sans',
    '--p-text-body-xs-font-size': '--p-font-size-275',
    '--p-text-body-xs-font-weight': '--p-font-weight-regular',
    '--p-text-body-xs-font-letter-spacing': '--p-font-letter-spacing-normal',
    '--p-text-body-xs-font-line-height': '--p-font-line-height-300',
  },
};
