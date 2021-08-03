import React from 'react';
import {mountWithApp} from 'test-utilities';

import {SkeletonDisplayText} from '../SkeletonDisplayText';

describe('<SkeletonDisplayText />', () => {
  it('renders', () => {
    const skeletonBodyText = mountWithApp(<SkeletonDisplayText />);
    expect(skeletonBodyText).toContainReactComponent('div');
  });
});
