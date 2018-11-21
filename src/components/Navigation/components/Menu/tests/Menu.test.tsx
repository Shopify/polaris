import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'test-utilities';
import Menu from '../Menu';

const actions = [
  {
    id: '123',
    items: [
      {
        content: 'notification',
        icon: 'notification' as 'notification',
        onAction: noop,
      },
    ],
  },
];

const message = {
  title: 'test message',
  description: 'test description',
  link: {to: '/', content: 'Home'},
  action: {
    onClick: noop,
    content: 'New',
  },
  badge: {
    content: 'flashy new home card',
    status: 'new' as 'new',
  },
};

const userProps = {
  name: 'Andrew Musgrave',
  detail: 'FED',
  actions,
  message,
  avatar: <div />,
  accessibilityLabel: '',
};

describe('<Menu />', () => {
  it('mounts', () => {
    const user = mountWithAppProvider(<Menu {...userProps} />);

    expect(user.exists()).toBe(true);
  });

  it('passes the actions prop', () => {
    const user = mountWithAppProvider(<Menu {...userProps} />);

    expect(user.prop('actions')).toBe(actions);
  });

  it('passes the message prop', () => {
    const user = mountWithAppProvider(<Menu {...userProps} />);

    expect(user.prop('message')).toBe(message);
  });
});
