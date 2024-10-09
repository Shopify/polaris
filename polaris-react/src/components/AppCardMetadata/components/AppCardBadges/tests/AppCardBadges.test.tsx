import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {AppCardBadges} from '../AppCardBadges';
import {AppCardBadge, AppCardBadgeEnum} from '../../../../AppCardBadge';

describe('<AppCardBadges />', () => {
  it('renders with default props', () => {
    const badges = mountWithApp(<AppCardBadges />);

    expect(badges).not.toContainReactComponent(AppCardBadge);
  });

  it('renders Built for Shopify badge', () => {
    const badges = mountWithApp(
      <AppCardBadges signifiers={['built_for_shopify']} />,
    );

    expect(badges).toContainReactComponent(AppCardBadge, {
      type: AppCardBadgeEnum.BuiltForShopify,
    });
  });
});
