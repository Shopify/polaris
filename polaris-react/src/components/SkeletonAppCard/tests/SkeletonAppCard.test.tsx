import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {SkeletonAppCard} from '../SkeletonAppCard';
import {AppCardWrapper} from '../../AppCard';
import {AppIcon} from '../../AppIcon';
import {SkeletonBodyText} from '../../SkeletonBodyText';

describe('<SkeletonAppCard />', () => {
  it('renders with default props', () => {
    const skeletonAppCard = mountWithApp(<SkeletonAppCard />);

    expect(skeletonAppCard).toContainReactComponent(AppCardWrapper, {
      variant: 'primary',
      as: 'div',
      accessibilityLabel: 'App card loading',
    });

    expect(skeletonAppCard).toContainReactComponent(AppIcon, {size: 'md'});

    const skeletonLines = skeletonAppCard.findAll(SkeletonBodyText);

    expect(skeletonLines).toHaveLength(2);
  });

  it('renders a large card using secondary variant as a li element', () => {
    const skeletonAppCard = mountWithApp(
      <SkeletonAppCard size="lg" variant="secondary" as="li" />,
    );

    expect(skeletonAppCard).toContainReactComponent(AppCardWrapper, {
      variant: 'secondary',
      as: 'li',
      accessibilityLabel: 'App card loading',
    });

    expect(skeletonAppCard).toContainReactComponent(AppIcon, {size: 'lg'});

    const skeletonLines = skeletonAppCard.findAll(SkeletonBodyText);

    expect(skeletonLines).toHaveLength(3);
  });

  it('renders a small card using noBackground variant as a li element', () => {
    const skeletonAppCard = mountWithApp(
      <SkeletonAppCard size="sm" variant="noBackground" as="li" />,
    );

    expect(skeletonAppCard).toContainReactComponent(AppCardWrapper, {
      variant: 'noBackground',
      as: 'li',
      accessibilityLabel: 'App card loading',
    });

    expect(skeletonAppCard).toContainReactComponent(AppIcon, {size: 'sm'});

    const skeletonLines = skeletonAppCard.findAll(SkeletonBodyText);

    expect(skeletonLines).toHaveLength(1);
  });
});
