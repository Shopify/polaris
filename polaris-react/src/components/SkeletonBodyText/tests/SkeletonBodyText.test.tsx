import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {SkeletonBodyText} from '../SkeletonBodyText';

describe('<SkeletonBodyText />', () => {
  it('renders the amount of lines provided', () => {
    const skeletonBodyText = mountWithApp(<SkeletonBodyText lines={2} />);
    expect(
      skeletonBodyText.findAll('div', {className: 'SkeletonBodyText'}),
    ).toHaveLength(2);
  });

  it('renders 3 lines if none are provided', () => {
    const skeletonBodyText = mountWithApp(<SkeletonBodyText />);
    expect(
      skeletonBodyText.findAll('div', {className: 'SkeletonBodyText'}),
    ).toHaveLength(3);
  });
});
