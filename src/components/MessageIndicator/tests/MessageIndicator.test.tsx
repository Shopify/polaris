import * as React from 'react';
import {mountWithAppProvider, findByTestID} from 'tests/utilities';
import MessageIndicator from '../MessageIndicator';

describe('<Indicator />', () => {
  it('mounts', () => {
    const indicator = mountWithAppProvider(<MessageIndicator />);
    expect(indicator.exists()).toBe(true);
  });

  it('renders its children', () => {
    const indicator = mountWithAppProvider(
      <MessageIndicator>
        <div>Hello Polaris</div>
      </MessageIndicator>,
    );

    expect(indicator.text()).toContain('Hello Polaris');
  });

  it('renders indicator markup when active is true', () => {
    const indicator = mountWithAppProvider(
      <MessageIndicator active>
        <div>Hello Polaris</div>
      </MessageIndicator>,
    );

    expect(findByTestID(indicator, 'indicator').exists()).toBe(true);
  });
});
