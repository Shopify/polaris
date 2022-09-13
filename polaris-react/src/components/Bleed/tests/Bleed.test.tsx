import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Bleed} from '../Bleed';

const Children = () => <p>This is a tile</p>;

describe('<Bleed />', () => {
  it('renders children', () => {
    const bleed = mountWithApp(
      <Bleed>
        <Children />
      </Bleed>,
    );

    expect(bleed).toContainReactComponent(Children);
  });
});
