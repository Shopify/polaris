import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Text} from '../../../../Text';
import {AppCardPricingInfo} from '../AppCardPricingInfo';

describe('<AppCardPricingInfo />', () => {
  it('renders pricing info', () => {
    const pricingInfo = mountWithApp(
      <AppCardPricingInfo pricingInfo="Free plan available" />,
    );

    expect(pricingInfo).toContainReactComponent(Text, {
      children: 'Free plan available',
      truncate: false,
    });
  });

  it('renders truncated pricing info', () => {
    const pricingInfo = mountWithApp(
      <AppCardPricingInfo pricingInfo="Free plan available" truncate />,
    );

    expect(pricingInfo).toContainReactComponent(Text, {
      children: 'Free plan available',
      truncate: true,
    });
  });
});
