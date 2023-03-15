import {mountWithApp} from 'tests/utilities';

import {LegacyStack} from '../LegacyStack';

describe('<LegacyStack />', () => {
  const renderChildren = () => [0, 1].map((i) => <div key={i}>Child {i}</div>);

  it('renders its children', () => {
    const legacyStack = mountWithApp(
      <LegacyStack>{renderChildren()}</LegacyStack>,
    );

    expect(legacyStack).toContainReactComponentTimes(LegacyStack.Item, 2);
  });
});
