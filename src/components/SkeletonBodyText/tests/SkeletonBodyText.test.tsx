import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import SkeletonBodyText from '../SkeletonBodyText';

describe('<SkeletonBodyText />', () => {
  it('renders the amount of lines provided', () => {
    const skeletonBodyText = mountWithAppProvider(
      <SkeletonBodyText lines={2} />,
    );
    expect(
      skeletonBodyText
        .find('div')
        .first()
        .children().length,
    ).toBe(2);
  });

  it('renders 3 lines if none are provided', () => {
    const skeletonBodyText = mountWithAppProvider(<SkeletonBodyText />);
    expect(
      skeletonBodyText
        .find('div')
        .first()
        .children().length,
    ).toBe(3);
  });
});
