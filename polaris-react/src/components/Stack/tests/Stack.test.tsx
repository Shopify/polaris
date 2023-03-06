import React from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line import/no-deprecated
import {Stack} from '../Stack';

describe('<Stack />', () => {
  const renderChildren = () => [0, 1].map((i) => <div key={i}>Child {i}</div>);

  it('renders its children', () => {
    const stack = mountWithApp(<Stack>{renderChildren()}</Stack>);

    // eslint-disable-next-line import/no-deprecated
    expect(stack).toContainReactComponentTimes(Stack.Item, 2);
  });
});
