import {mountWithApp} from 'tests/utilities';

import {SkeletonThumbnail} from '../SkeletonThumbnail';

describe('<SkeletonThumbnail />', () => {
  it('renders', () => {
    const skeletonThumbnail = mountWithApp(<SkeletonThumbnail />);
    expect(skeletonThumbnail).toContainReactComponent('div');
  });
});
