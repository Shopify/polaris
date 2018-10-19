import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import SkeletonDisplayText from '../SkeletonDisplayText';

describe('<SkeletonDisplayText />', () => {
  it('renders', () => {
    const skeletonBodyText = mountWithAppProvider(<SkeletonDisplayText />);
    expect(skeletonBodyText.exists()).toBe(true);
  });
});
