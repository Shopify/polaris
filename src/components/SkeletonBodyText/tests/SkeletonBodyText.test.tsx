import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {SkeletonBodyText} from '../SkeletonBodyText';

describe('<SkeletonBodyText />', () => {
  it('renders the amount of lines provided', () => {
    const skeletonBodyText = mountWithAppProvider(
      <SkeletonBodyText lines={2} />,
    );
    expect(skeletonBodyText.find('div').first().children()).toHaveLength(2);
  });

  it('renders 3 lines if none are provided', () => {
    const skeletonBodyText = mountWithAppProvider(<SkeletonBodyText />);
    expect(skeletonBodyText.find('div').first().children()).toHaveLength(3);
  });
});
