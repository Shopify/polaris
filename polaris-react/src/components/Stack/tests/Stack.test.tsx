import {mountWithApp} from 'tests/utilities';

import {Stack} from '../Stack';

describe('<Stack />', () => {
  const renderChildren = () => [0, 1].map((i) => <div key={i}>Child {i}</div>);

  it('renders its children', () => {
    const stack = mountWithApp(<Stack>{renderChildren()}</Stack>);

    expect(stack).toContainReactComponentTimes(Stack.Item, 2);
  });
});
