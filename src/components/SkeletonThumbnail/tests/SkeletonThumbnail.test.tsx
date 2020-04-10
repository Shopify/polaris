import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {SkeletonThumbnail} from '../SkeletonThumbnail';

describe('<SkeletonThumbnail />', () => {
  it('renders', () => {
    const skeletonThumbnail = mountWithAppProvider(<SkeletonThumbnail />);
    expect(skeletonThumbnail.exists()).toBe(true);
  });
});
