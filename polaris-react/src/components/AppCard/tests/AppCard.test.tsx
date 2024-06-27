import React from 'react';
import {mountWithApp} from 'tests/utilities';

import type {AppCardProps} from '../AppCard';
import {AppCard} from '../AppCard';
import {AppCardWrapper} from '../components';
import {AppCardAction, AppCardActionEnum} from '../../AppCardAction';
import {AppIcon} from '../../AppIcon';
import {AppCardMetadata} from '../../AppCardMetadata';
import {AppCardSizingMode} from '../types';

const iconUrl =
  'https://cdn.shopify.com/app-store/listing_images/532861601aa89a5e70f5d56d075e82ac/icon/CLq7q92-4_0CEAE=.png';

const appCardProps: AppCardProps = {
  action: {type: AppCardActionEnum.Install},
  iconUrl,
  title: 'Shop',
  starRating: 4.8,
  description:
    'The Shop channel is your control center for managing and optimizing your brand presence on Shop.',
  signifiers: ['built_for_shopify'],
  pricingInfo: 'Free plan available',
};

describe('<AppCard />', () => {
  it('renders with default props', () => {
    const card = mountWithApp(<AppCard {...appCardProps} />);

    expect(card).toContainReactComponent(AppCardWrapper, {
      as: 'div',
      variant: 'primary',
      onNarrowChange: expect.any(Function),
      accessibilityLabel: 'Shop app card',
    });

    expect(card).toContainReactComponent(AppIcon, {
      onClick: undefined,
      size: 'md',
      appTitle: 'Shop',
      source: iconUrl,
    });

    expect(card).toContainReactComponent(AppCardMetadata, {
      onTitleClick: undefined,
      signifiers: ['built_for_shopify'],
      truncate: false,
      starRating: 4.8,
      pricingInfo: 'Free plan available',
      appTitle: 'Shop',
      appDescription:
        'The Shop channel is your control center for managing and optimizing your brand presence on Shop.',
    });

    expect(card).toContainReactComponent(AppCardAction, {
      action: {
        type: AppCardActionEnum.Install,
      },
      variant: 'default',
    });
  });

  it('renders with secondary variant and size=sm', () => {
    const card = mountWithApp(
      <AppCard {...appCardProps} size="sm" variant="secondary" />,
    );

    expect(card).toContainReactComponent(AppCardWrapper, {
      as: 'div',
      variant: 'secondary',
      onNarrowChange: expect.any(Function),
      accessibilityLabel: 'Shop app card',
    });

    expect(card).toContainReactComponent(AppIcon, {
      onClick: undefined,
      size: 'sm',
      appTitle: 'Shop',
      source: iconUrl,
    });

    expect(card).toContainReactComponent(AppCardMetadata, {
      onTitleClick: undefined,
      signifiers: ['built_for_shopify'],
      truncate: false,
      appTitle: 'Shop',
      starRating: 4.8,
      pricingInfo: 'Free plan available',
      appDescription:
        'The Shop channel is your control center for managing and optimizing your brand presence on Shop.',
    });

    expect(card).toContainReactComponent(AppCardAction, {
      action: {
        type: AppCardActionEnum.Install,
      },
      variant: 'default',
    });
  });

  it('renders with noBackground variant and size=lg', () => {
    const card = mountWithApp(
      <AppCard {...appCardProps} size="lg" variant="noBackground" />,
    );

    expect(card).toContainReactComponent(AppCardWrapper, {
      as: 'div',
      variant: 'noBackground',
      onNarrowChange: expect.any(Function),
      accessibilityLabel: 'Shop app card',
    });

    expect(card).toContainReactComponent(AppIcon, {
      onClick: undefined,
      size: 'lg',
      appTitle: 'Shop',
      source: iconUrl,
    });

    expect(card).toContainReactComponent(AppCardMetadata, {
      onTitleClick: undefined,
      signifiers: ['built_for_shopify'],
      truncate: false,
      appTitle: 'Shop',
      starRating: 4.8,
      pricingInfo: 'Free plan available',
      appDescription:
        'The Shop channel is your control center for managing and optimizing your brand presence on Shop.',
    });

    expect(card).toContainReactComponent(AppCardAction, {
      action: {
        type: AppCardActionEnum.Install,
      },
      variant: 'default',
    });
  });

  it('renders Wrapper as listitem', () => {
    const card = mountWithApp(<AppCard {...appCardProps} as="li" />);

    expect(card).toContainReactComponent(AppCardWrapper, {
      as: 'li',
      variant: 'primary',
      onNarrowChange: expect.any(Function),
      accessibilityLabel: 'Shop app card',
    });
  });

  it('renders narrow version of AppCard when sizingMode=always_narrow', () => {
    const card = mountWithApp(
      <AppCard {...appCardProps} sizingMode={AppCardSizingMode.AlwaysNarrow} />,
    );

    expect(card).toContainReactComponent(AppCardMetadata, {
      onTitleClick: undefined,
      signifiers: ['built_for_shopify'],
      truncate: true,
      appTitle: 'Shop',
      starRating: 4.8,
      pricingInfo: 'Free plan available',
      appDescription: undefined,
    });

    expect(card).toContainReactComponent(AppCardAction, {
      action: {
        type: AppCardActionEnum.Install,
      },
      variant: 'narrow',
    });
  });

  it('renders narrow version of AppCard when Wrapper returns true onNarrowChange', () => {
    const card = mountWithApp(<AppCard {...appCardProps} />);

    card.find(AppCardWrapper)?.trigger('onNarrowChange', true);

    expect(card).toContainReactComponent(AppCardMetadata, {
      onTitleClick: undefined,
      signifiers: ['built_for_shopify'],
      truncate: true,
      appTitle: 'Shop',
      starRating: 4.8,
      pricingInfo: 'Free plan available',
      appDescription: undefined,
    });

    expect(card).toContainReactComponent(AppCardAction, {
      action: {
        type: AppCardActionEnum.Install,
      },
      variant: 'narrow',
    });
  });

  it('triggers onTitleClick when title is clicked within AppCardMetadata', () => {
    const spy = jest.fn();
    const card = mountWithApp(<AppCard {...appCardProps} onTitleClick={spy} />);

    card.find(AppCardMetadata)?.trigger('onTitleClick');

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('triggers onIconClick when icon is clicked within AppIcon', () => {
    const spy = jest.fn();
    const card = mountWithApp(<AppCard {...appCardProps} onIconClick={spy} />);

    card.find(AppIcon)?.trigger('onClick');

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
