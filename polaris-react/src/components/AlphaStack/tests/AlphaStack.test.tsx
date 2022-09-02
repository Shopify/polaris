import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {AlphaStack} from '../AlphaStack';

describe('<AlphaStack />', () => {
  const renderChildren = () => [0, 1].map((i) => <div key={i}>Child {i}</div>);

  it('renders its children', () => {
    const stack = mountWithApp(<AlphaStack>{renderChildren()}</AlphaStack>);

    expect(stack).toContainReactComponentTimes('div', 3);
  });
});
