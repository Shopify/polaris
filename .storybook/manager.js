import {addons} from '@storybook/addons';
import {create} from '@storybook/theming';

addons.setConfig({
  panelPosition: 'bottom',
  theme: create({
    base: 'light',
    brandTitle: 'Shopify Polaris Storybook',
    brandUrl: '/',
    brandImage: null,
    appBorderRadius: 0,
  }),
});
