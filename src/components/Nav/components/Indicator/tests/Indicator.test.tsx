import * as React from 'react';
import {
  mountWithAppProvider,
  findByTestID,
} from '../../../../../../tests/utilities';
import Indicator from '../Indicator';

describe('<Indicator />', () => {
  it('mounts', () => {
    const indicator = mountWithAppProvider(<Indicator />);
    expect(indicator.exists()).toBe(true);
  });

  it('renders its children', () => {
    const indicator = mountWithAppProvider(
      <Indicator>
        <div>Hello Polaris</div>
      </Indicator>,
    );

    expect(indicator.text()).toContain('Hello Polaris');
  });

  it('renders indicator markup when active is true', () => {
    const indicator = mountWithAppProvider(
      <Indicator active>
        <div>Hello Polaris</div>
      </Indicator>,
    );

    expect(findByTestID(indicator, 'indicator').exists()).toBe(true);
  });
});
