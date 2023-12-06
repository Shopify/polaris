import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {SkeletonDisplayText} from '../SkeletonDisplayText';

describe('<SkeletonDisplayText />', () => {
  it('renders', () => {
    const skeletonBodyText = mountWithApp(<SkeletonDisplayText />);
    expect(skeletonBodyText).toContainReactComponent('div');
  });

  it('renders with maxWidth prop', () => {
    const skeletonBodyText = mountWithApp(
      <SkeletonDisplayText maxWidth="75ch" />,
    );
    expect(skeletonBodyText).toContainReactComponent('div', {
      style: {
        '--pc-skeleton-display-text-max-width': '75ch',
      } as React.CSSProperties,
    });
  });
});
