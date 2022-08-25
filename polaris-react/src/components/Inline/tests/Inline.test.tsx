import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Inline} from '../Inline';

describe('<Inline />', () => {
  const renderChildren = () => [0, 1].map((i) => <div key={i}>Child {i}</div>);

  it('renders its children', () => {
    const stack = mountWithApp(<Inline>{renderChildren()}</Inline>);

    expect(stack).toContainReactComponentTimes(Inline.Item, 2);
  });
});
