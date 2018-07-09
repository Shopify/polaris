import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import UserMenu from '../UserMenu';

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
  avatarInitials: 'am',
};

describe('<UserMenu />', () => {
  it('mounts', () => {
    const user = mountWithAppProvider(<UserMenu {...userProps} />);

    expect(user.exists()).toBe(true);
  });

  it('passes the actions prop', () => {
    const user = mountWithAppProvider(<UserMenu {...userProps} />);

    expect(user.prop('actions')).toBe(actions);
  });

  it('passes the message prop', () => {
    const user = mountWithAppProvider(<UserMenu {...userProps} />);

    expect(user.prop('message')).toBe(message);
  });
});
