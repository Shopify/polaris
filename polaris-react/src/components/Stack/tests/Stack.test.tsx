import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Stack} from '../Stack';

describe('<Stack />', () => {
  const renderChildren = () => [0, 1].map((i) => <div key={i}>Child {i}</div>);

  it('renders its children', () => {
    const stack = mountWithApp(<Stack>{renderChildren()}</Stack>);

    expect(stack).toContainReactComponentTimes(Stack.Item, 2);
  });

  it('flattens one depth of React.Fragment with "flattenReactFragments"', () => {
    const stack = mountWithApp(
      <Stack flattenReactFragments>
        <>
          <p>One</p>
          <p>Two</p>
          <p>
            Three
            <>
              <p>This should not be flattened</p>
            </>
          </p>
        </>
        <p>Four</p>
      </Stack>,
    );

    expect(stack).toContainReactComponentTimes(Stack.Item, 4);
  });
});
