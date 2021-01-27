import {addons} from '@storybook/addons';
import {create} from '@storybook/theming';
import tokens from '@shopify/polaris-tokens';

const colors = {
  primary: '#008060',
  secondary: '#6d7175',
  background: '#f6f6f7',
  border: '#202123',
};

addons.setConfig({
  panelPosition: 'right',
  theme: create({
    base: 'light',
    brandTitle: 'Shopify Polaris Storybook',
    brandUrl: '/',
    brandImage:
      'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-primary-logo-456baa801ee66a0a435671082365958316831c9960c480451dd0330bcdae304f.svg',
    appBg: colors.background,
    appContentBg: colors.background,
    appBorderRadius: 4,

    colorPrimary: colors.primary,
    colorSecondary: colors.secondary,

    // // Typography
    textColor: tokens.colorInkLight,
    textInverseColor: tokens.colorWhite,
    fontBase: 'ShopifySans, Helvetica, Arial, Lucida Grande, sans-serif',

    // Toolbar default and active colors
    barTextColor: tokens.colorInkLight,
    barSelectedColor: colors.primary,
    barBg: colors.background,

    // // Form colors'
    inputBg: colors.background,
    inputBorder: colors.background,
    inputTextColor: tokens.colorWhite,
    inputBorderRadius: 4,
  }),
});
