import {addons} from '@storybook/addons';
import {create} from '@storybook/theming';
import tokens from '@shopify/polaris-tokens';

addons.setConfig({
  panelPosition: 'right',
  theme: create({
    base: 'light',
    brandTitle: 'Shopify Polaris Storybook',
    brandUrl: '/',
    brandImage:
      'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-primary-logo-456baa801ee66a0a435671082365958316831c9960c480451dd0330bcdae304f.svg',
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
