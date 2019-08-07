import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import SkeletonThumbnail from '../SkeletonThumbnail';

describe('<SkeletonThumbnail />', () => {
  it('renders', () => {
    const skeletonThumbnail = mountWithAppProvider(<SkeletonThumbnail />);
    expect(skeletonThumbnail.exists()).toBe(true);
  });
});
