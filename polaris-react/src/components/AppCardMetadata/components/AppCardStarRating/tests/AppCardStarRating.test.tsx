import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {AppCardStarRating} from '../AppCardStarRating';
import {Text} from '../../../../Text';

describe('<AppCardStarRating />', () => {
  it('renders a star rating', () => {
    const starRating = mountWithApp(<AppCardStarRating starRating={4.5} />);

    expect(starRating).toContainReactComponent(Text, {
      children: 4.5,
    });
  });
});
