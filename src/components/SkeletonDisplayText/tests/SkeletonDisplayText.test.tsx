import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {SkeletonDisplayText} from '../SkeletonDisplayText';

describe('<SkeletonDisplayText />', () => {
  it('renders', () => {
    const skeletonBodyText = mountWithAppProvider(<SkeletonDisplayText />);
    expect(skeletonBodyText.exists()).toBe(true);
  });
});
