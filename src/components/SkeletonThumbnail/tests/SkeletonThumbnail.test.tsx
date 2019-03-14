import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import SkeletonThumbnail from '../SkeletonThumbnail';

describe('<SkeletonThumbnail />', () => {
  it('renders', () => {
    const skeletonThumbnail = mountWithAppProvider(<SkeletonThumbnail />);
    expect(skeletonThumbnail.exists()).toBe(true);
  });
});
