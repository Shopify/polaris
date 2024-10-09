import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {AppIcon} from '../AppIcon';
import {Image} from '../../Image';

const source =
  'https://cdn.shopify.com/app-store/listing_images/532861601aa89a5e70f5d56d075e82ac/icon/CLq7q92-4_0CEAE=.png';

describe('<AppIcon />', () => {
  it('renders with default props', () => {
    const appIcon = mountWithApp(<AppIcon />);

    expect(appIcon).toContainReactComponent('div', {
      role: 'region',
      onClick: expect.any(Function),
      className: 'IconLink LinkDisabled',
      'aria-label': 'View app details for the app',
      tabIndex: undefined,
    });

    expect(appIcon).not.toContainReactComponent(Image);
    expect(appIcon).toContainReactComponent('div', {
      className: 'Image medium',
    });
  });

  it('renders with an icon source and onClick callback', () => {
    const appIcon = mountWithApp(
      <AppIcon source={source} onClick={() => {}} />,
    );

    expect(appIcon).toContainReactComponent('div', {
      role: 'link',
      onClick: expect.any(Function),
      className: 'IconLink',
      'aria-label': 'View app details for the app',
      tabIndex: 0,
    });

    expect(appIcon).toContainReactComponent(Image, {
      className: 'Image medium',
      source,
      alt: 'App icon',
    });
  });

  it('renders xlarge Shop app icon with an icon source', () => {
    const appIcon = mountWithApp(
      <AppIcon appTitle="Shop" size="xl" source={source} />,
    );

    expect(appIcon).toContainReactComponent('div', {
      role: 'link',
      onClick: expect.any(Function),
      className: 'IconLink LinkDisabled',
      'aria-label': 'View app details for app: Shop',
      tabIndex: undefined,
    });

    expect(appIcon).toContainReactComponent(Image, {
      className: 'Image xlarge',
      source,
      alt: 'Shop icon',
    });
  });

  it('renders small Shop app icon with an icon source', () => {
    const appIcon = mountWithApp(
      <AppIcon appTitle="Shop" size="sm" source={source} />,
    );

    expect(appIcon).toContainReactComponent('div', {
      role: 'link',
      onClick: expect.any(Function),
      className: 'IconLink LinkDisabled',
      'aria-label': 'View app details for app: Shop',
      tabIndex: undefined,
    });

    expect(appIcon).toContainReactComponent(Image, {
      className: 'Image small',
      source,
      alt: 'Shop icon',
    });
  });

  it('renders large Shop app icon with an icon source', () => {
    const appIcon = mountWithApp(
      <AppIcon appTitle="Shop" size="lg" source={source} />,
    );

    expect(appIcon).toContainReactComponent('div', {
      role: 'link',
      onClick: expect.any(Function),
      className: 'IconLink LinkDisabled',
      'aria-label': 'View app details for app: Shop',
      tabIndex: undefined,
    });

    expect(appIcon).toContainReactComponent(Image, {
      className: 'Image large',
      source,
      alt: 'Shop icon',
    });
  });

  it('triggers onClick callback after clicking on icon', () => {
    const spy = jest.fn();
    const appIcon = mountWithApp(<AppIcon onClick={spy} source={source} />);

    appIcon.find('div')?.trigger('onClick');

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
