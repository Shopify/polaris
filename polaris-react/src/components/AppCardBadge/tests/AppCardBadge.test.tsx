import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {AppCardBadge} from '../AppCardBadge';
import {Badge} from '../../Badge';
import {AppCardBadgeEnum} from '../types';

describe('<AppCardBadge />', () => {
  it('renders Built for Shopify badge', () => {
    const badge = mountWithApp(
      <AppCardBadge type={AppCardBadgeEnum.BuiltForShopify} />,
    );

    expect(badge).toContainReactComponent(Badge, {
      children: 'Built for Shopify',
    });
  });
});
