import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {AppCardMetadata} from '../AppCardMetadata';
import {
  AppCardAppTitle,
  AppCardBadges,
  AppCardDescription,
  AppCardPricingInfo,
  AppCardStarRating,
} from '../components';

describe('<AppCardMetadata />', () => {
  it('renders with default props', () => {
    const metadata = mountWithApp(<AppCardMetadata appTitle="Shop" />);

    expect(metadata).toContainReactComponent(AppCardAppTitle, {
      appTitle: 'Shop',
      variant: 'default',
      truncate: false,
      onTitleClick: undefined,
    });

    expect(metadata).not.toContainReactComponent(AppCardStarRating);
    expect(metadata).not.toContainReactComponent(AppCardPricingInfo);
    expect(metadata).not.toContainReactComponent(AppCardDescription);

    expect(metadata).toContainReactComponent(AppCardBadges, {
      signifiers: [],
    });
  });

  it('renders all Shop metadata using large title variant, but hides description', () => {
    const metadata = mountWithApp(
      <AppCardMetadata
        titleVariant="large"
        appTitle="Shop"
        starRating={4.5}
        pricingInfo="Free plan available"
        signifiers={['built_for_shopify']}
      />,
    );

    expect(metadata).toContainReactComponent(AppCardAppTitle, {
      appTitle: 'Shop',
      variant: 'large',
      truncate: false,
      onTitleClick: undefined,
    });

    expect(metadata).toContainReactComponent(AppCardStarRating, {
      starRating: 4.5,
    });
    expect(metadata).toContainReactComponent(AppCardPricingInfo, {
      pricingInfo: 'Free plan available',
    });
    expect(metadata).not.toContainReactComponent(AppCardDescription);

    expect(metadata).toContainReactComponent(AppCardBadges, {
      signifiers: ['built_for_shopify'],
    });
  });

  it('renders all Shop metadata using large title variant, but hides pricingInfo', () => {
    const metadata = mountWithApp(
      <AppCardMetadata
        titleVariant="large"
        appTitle="Shop"
        starRating={4.5}
        appDescription="App description"
        signifiers={['built_for_shopify']}
      />,
    );

    expect(metadata).toContainReactComponent(AppCardAppTitle, {
      appTitle: 'Shop',
      variant: 'large',
      truncate: false,
      onTitleClick: undefined,
    });

    expect(metadata).toContainReactComponent(AppCardStarRating, {
      starRating: 4.5,
    });
    expect(metadata).not.toContainReactComponent(AppCardPricingInfo);

    expect(metadata).toContainReactComponent(AppCardDescription, {
      description: 'App description',
    });

    expect(metadata).toContainReactComponent(AppCardBadges, {
      signifiers: ['built_for_shopify'],
    });
  });

  it('renders all Shop metadata using large title variant, but hides starRating', () => {
    const metadata = mountWithApp(
      <AppCardMetadata
        titleVariant="large"
        appTitle="Shop"
        pricingInfo="Free plan available"
        appDescription="App description"
        signifiers={['built_for_shopify']}
      />,
    );

    expect(metadata).toContainReactComponent(AppCardAppTitle, {
      appTitle: 'Shop',
      variant: 'large',
      truncate: false,
      onTitleClick: undefined,
    });

    expect(metadata).not.toContainReactComponent(AppCardStarRating);

    expect(metadata).toContainReactComponent(AppCardPricingInfo, {
      pricingInfo: 'Free plan available',
    });

    expect(metadata).toContainReactComponent(AppCardDescription, {
      description: 'App description',
    });

    expect(metadata).toContainReactComponent(AppCardBadges, {
      signifiers: ['built_for_shopify'],
    });
  });

  it('truncates pricingInfo and title when truncate=true', () => {
    const metadata = mountWithApp(
      <AppCardMetadata
        truncate
        appTitle="Shop"
        pricingInfo="Free plan available"
      />,
    );

    expect(metadata).toContainReactComponent(AppCardPricingInfo, {
      pricingInfo: 'Free plan available',
      truncate: true,
    });

    expect(metadata).toContainReactComponent(AppCardAppTitle, {
      appTitle: 'Shop',
      variant: 'default',
      truncate: true,
      onTitleClick: undefined,
    });
  });

  it('triggers onTitleClick callback when app title is clicked', () => {
    const spy = jest.fn();
    const metadata = mountWithApp(
      <AppCardMetadata onTitleClick={spy} appTitle="Shop" />,
    );

    metadata.find(AppCardAppTitle)?.trigger('onTitleClick');

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
