import React from 'react';

import {mountWithAppContext} from 'tests/modern';

import {NotificationsIndicator} from '../NotificationsIndicator';

describe('<Indicator />', () => {
  it('mounts', () => {
    const indicator = mountWithAppContext(<NotificationsIndicator />);

    expect(indicator).not.toBeNull();
  });

  it('renders its children', () => {
    const indicator = mountWithAppContext(
      <NotificationsIndicator>
        <div>Hello</div>
      </NotificationsIndicator>,
    );

    expect(indicator).toContainReactText('Hello');
  });

  it('renders indicator markup when active is true', () => {
    const indicator = mountWithAppContext(
      <NotificationsIndicator active>
        <div>Hello</div>
      </NotificationsIndicator>,
    );

    expect(indicator).toContainReactComponent('div', {
      className: 'NotificationsIndicator',
    });
  });
});
