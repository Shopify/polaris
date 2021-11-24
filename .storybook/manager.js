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
    appBg: '#f4f6f8',
    contentBg: '#f4f6f8',
    textColor: '#212b36',
  }),
});
