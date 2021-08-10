import React from 'react';
import {mountWithApp} from 'test-utilities';

import {SkeletonThumbnail} from '../SkeletonThumbnail';

describe('<SkeletonThumbnail />', () => {
  it('renders', () => {
    const skeletonThumbnail = mountWithApp(<SkeletonThumbnail />);
    expect(skeletonThumbnail).toContainReactComponent('div');
  });
});
