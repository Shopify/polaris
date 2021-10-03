import {addons} from '@storybook/addons';
import {create} from '@storybook/theming';
import {colorSkyLight, colorInk} from '@shopify/polaris-tokens';

addons.setConfig({
  panelPosition: 'bottom',
  theme: create({
    base: 'light',
    brandTitle: 'Shopify Polaris Storybook',
    brandUrl: '/',
    brandImage: null,
    appBorderRadius: 0,
    appBg: colorSkyLight,
    contentBg: colorSkyLight,
    textColor: colorInk,
    // TODO more pretty brand colors?
    // SEE https://github.com/storybooks/storybook/blob/next/docs/src/pages/configurations/theming/index.md
  }),
});
