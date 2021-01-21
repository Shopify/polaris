import {addons} from '@storybook/addons';
import {create} from '@storybook/theming';
import tokens from '@shopify/polaris-tokens';

addons.setConfig({
  panelPosition: 'bottom',
  theme: create({
    base: 'dark',
    brandTitle: 'Shopify Polaris Storybook',
    brandUrl: '/',
    brandImage:
      'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-inverted-primary-logo-bdc6ddd67862d9bb1f8c559e1bb50dd233112ac57b29cac2edcf17ed2e1fe6fa.svg',
    appBorderRadius: 4,
    colorPrimary: '#009671',
    colorSecondary: '#36a3ff',

    // // Typography
    textColor: tokens.colorWhite,
    textInverseColor: tokens.colorBlack,
    fontBase: 'ShopifySans, Helvetica, Arial, Lucida Grande, sans-serif',

    // // Toolbar default and active colors
    barTextColor: tokens.colorWhite,
    barSelectedColor: '#009671',
    barBg: '#202123',

    // // Form colors
    inputBg: '#202123',
    inputBorder: '#202123',
    inputTextColor: tokens.colorWhite,
    inputBorderRadius: 4,
  }),
});
