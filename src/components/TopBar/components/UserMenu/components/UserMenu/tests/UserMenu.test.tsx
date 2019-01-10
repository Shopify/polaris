import * as React from 'react';
import {ReactWrapper} from 'enzyme';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'test-utilities';
import Menu from '../../../../Menu';
import UserMenu from '../UserMenu';

const actions = [
  {items: [{icon: 'notification' as 'notification', onAction: noop}]},
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
  actions,
  name: 'Andrew Musgrave',
  detail: 'FED',
  initials: 'am',
  open: true,
  onToggle: noop,
  message,
};

describe('<UserMenu />', () => {
  it('mounts', () => {
    const user = mountWithAppProvider(<UserMenu {...userProps} />);
    expect(user).toBeTruthy();
  });

  it('constructs activatorContent and passes it down to menu', () => {
    const user = mountWithAppProvider(<UserMenu {...userProps} />);
    expect(returnMenuProp(user, 'activatorContent')).toBeTruthy();
  });

  it('passes the open prop down to menu', () => {
    const user = mountWithAppProvider(<UserMenu {...userProps} />);
    expect(returnMenuProp(user, 'open')).toBe(true);
  });

  it('passes the actions prop down to menu', () => {
    const user = mountWithAppProvider(<UserMenu {...userProps} />);
    expect(returnMenuProp(user, 'actions')).toBe(actions);
  });

  it('passes the message prop down to menu', () => {
    const user = mountWithAppProvider(<UserMenu {...userProps} />);
    expect(returnMenuProp(user, 'message')).toBe(message);
  });

  describe('onToggle', () => {
    it('passes the onToggle prop down to menu as onOpen', () => {
      const user = mountWithAppProvider(<UserMenu {...userProps} />);
      expect(returnMenuProp(user, 'onOpen')).toBe(noop);
    });

    it('passes the onToggle prop down to menu as onClose', () => {
      const user = mountWithAppProvider(<UserMenu {...userProps} />);
      expect(returnMenuProp(user, 'onClose')).toBe(noop);
    });
  });
});

function returnMenuProp(wrapper: ReactWrapper, prop: string) {
  return wrapper.find(Menu).prop(prop);
}
