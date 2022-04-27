import {addons, types} from '@storybook/addons';
import {create} from '@storybook/theming';
import {GridPanel} from './GridPanel';

const colors = {
  primary: '#008060',
  secondary: '#6d7175',
  background: '#f6f6f7',
  border: '#202123',
  surface: '#ffffff',
  text: '#202223',
};

addons.setConfig({
  // Config
  panelPosition: 'bottom',

  // Base theme
  theme: create({
    base: 'light',
    brandTitle: 'Shopify Polaris Storybook',
    brandUrl: '/',
    brandImage:
      'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-primary-logo-456baa801ee66a0a435671082365958316831c9960c480451dd0330bcdae304f.svg',
    appBg: colors.background,
    appContentBg: colors.background,
    appBorderRadius: 4,

    // Main colors
    colorPrimary: colors.primary,
    colorSecondary: colors.secondary,

    // Typography
    textColor: colors.text,
    textInverseColor: colors.surface,
    fontBase: 'ShopifySans, Helvetica, Arial, Lucida Grande, sans-serif',

    // Toolbar default and active colors
    barTextColor: colors.text,
    barSelectedColor: colors.primary,
    barBg: colors.background,

    // Form colors
    inputBg: colors.background,
    inputBorder: colors.background,
    inputTextColor: colors.text,
    inputBorderRadius: 4,
  }),
});

addons.register('polaris/global-controls', () => {
  addons.add('grid/panel', {
    type: types.PANEL,
    title: 'Grid',
    match: ({viewMode}) => viewMode === 'story',
    render: GridPanel,
  });
});
