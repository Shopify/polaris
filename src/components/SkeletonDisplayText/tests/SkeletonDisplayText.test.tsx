import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import SkeletonDisplayText from '../SkeletonDisplayText';

describe('<SkeletonDisplayText />', () => {
  it('renders', () => {
    const skeletonBodyText = mountWithAppProvider(<SkeletonDisplayText />);
    expect(skeletonBodyText.exists()).toBe(true);
  });
});
