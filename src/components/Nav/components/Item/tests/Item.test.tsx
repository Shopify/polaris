import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {Icon, UnstyledLink} from '../../../../../components';
import {add} from '../../../../../icons';

import {trigger, mountWithAppProvider} from '../../../../../../tests/utilities';

import Item, {Props as ItemProps} from '../Item';
import Nav from '../../../Nav';

describe('<Nav.Item />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  it('sets expanded to false on resize when !navBarCollapsed and location does not match', () => {
    const spy = jest.fn();
    matchMedia.setMedia(() => ({addListener: spy}));
    const item = mountWithAppProvider(
      <Item
        label="some label"
        url="/admin/orders"
        disabled={false}
        subNavItems={[
          {
            url: '/admin/draft_orders',
            disabled: false,
            label: 'draft orders',
          },
        ]}
      />,
      {
        context: {location: '/admin/products'},
      },
    );

    const mediaAddListener = spy.mock.calls[0][0];

    matchMedia.setMedia(() => ({matches: true}));
    trigger(item.find(UnstyledLink).first(), 'onClick', {
      preventDefault: jest.fn(),
      currentTarget: {
        getAttribute: () => '/admin/orders',
      },
    });

    expect(item.state('expanded')).toBe(true);
    matchMedia.setMedia(() => ({matches: false}));
    mediaAddListener();
    expect(item.state('expanded')).toBe(false);
  });

  it('remains expanded on resize when navBarCollapsed and location matches', () => {
    const item = itemForLocation('/admin/orders');

    matchMedia.setMedia(() => ({matches: true}));
    trigger(item.find(UnstyledLink).first(), 'onClick', {
      preventDefault: jest.fn(),
      currentTarget: {
        getAttribute: () => '/admin/orders',
      },
    });

    expect(item.state('expanded')).toBe(true);
    matchMedia.setMedia(() => ({matches: false}));
    expect(item.state('expanded')).toBe(true);
  });

  describe('renders', () => {
    it('renders a button when url is not provided', () => {
      const item = mountWithAppProvider(
        <Item
          label="some label"
          disabled={false}
          subNavItems={[
            {
              url: '/admin/draft_orders',
              disabled: false,
              label: 'draft orders',
            },
          ]}
        />,
        {
          context: {location: '/admin/orders'},
        },
      );

      const button = item.find('button');
      expect(button.exists()).toBe(true);
    });

    it('renders an UnstyledLink when url is provided', () => {
      const item = itemForLocation('/admin/orders');

      const link = item.find(UnstyledLink);
      expect(link.exists()).toBe(true);
    });
  });

  describe('with SubNavItems', () => {
    it('renders expanded when given url is a perfect match for location', () => {
      const item = itemForLocation('/admin/orders');

      const secondary = item.find(Nav.Secondary);
      expect(secondary.exists()).toBe(true);
    });

    it('renders expanded when a url is a startsWith match for location', () => {
      const item = itemForLocation('/admin/orders?foo=bar');

      const secondary = item.find(Nav.Secondary);
      expect(secondary.exists()).toBe(true);
    });

    it('renders expanded when a child is a perfect match for location', () => {
      const item = itemForLocation('/admin/draft_orders');

      const secondary = item.find(Nav.Secondary);
      expect(secondary.exists()).toBe(true);
    });

    it('renders expanded when a child is a startsWith match for location', () => {
      const item = itemForLocation('/admin/draft_orders?foo=bar');

      const secondary = item.find(Nav.Secondary);
      expect(secondary.exists()).toBe(true);
    });

    it('does not render expanded when parent and children both have no match on the location', () => {
      const item = itemForLocation('/admin/notARealRoute');

      const secondary = item.find(Nav.Secondary);
      expect(secondary.exists()).toBe(false);
    });
  });

  describe('with exactMatch true', () => {
    it('renders expanded when given url is a perfect match for location', () => {
      const item = itemForLocation('/admin/orders', {exactMatch: true});

      const secondary = item.find(Nav.Secondary);
      expect(secondary.exists()).toBe(true);
    });

    it('does not render expanded when no exact match on url', () => {
      const item = itemForLocation('/admin/orders/1', {exactMatch: true});

      const secondary = item.find(Nav.Secondary);
      expect(secondary.exists()).toBe(false);
    });

    it('still renders expanded when there is a match on url for one of it`s children', () => {
      const item = itemForLocation('/admin/draft_orders', {exactMatch: true});

      const secondary = item.find(Nav.Secondary);
      expect(secondary.exists()).toBe(true);
    });
  });

  describe('delegated props', () => {
    it('delegates icon to <Icon />', () => {
      const item = mountWithAppProvider(
        <Item label="some label" url="foo" disabled={false} icon={add} />,
        {
          context: {location: 'bar'},
        },
      );

      expect(item.find(Icon).exists()).toBe(true);
    });

    it('delegates label to <UnstyledLink />', () => {
      const item = mountWithAppProvider(
        <Item url="foo" disabled={false} label="baz" />,
        {
          context: {location: 'bar'},
        },
      );

      expect(item.find(UnstyledLink).text()).toBe('baz');
    });

    it('delegates url to <UnstyledLink />', () => {
      const item = mountWithAppProvider(
        <Item label="some label" url="foo" disabled={false} />,
        {
          context: {location: 'bar'},
        },
      );

      expect(item.prop('url')).toBe('foo');
    });

    it('delegates disabled to <UnstyledLink />', () => {
      const item = mountWithAppProvider(
        <Item label="some label" url="foo" disabled />,
        {
          context: {location: 'bar'},
        },
      );

      expect(item.find(UnstyledLink).prop('aria-disabled')).toBe(true);
    });

    it('delegates accessibilityLabel to <UnstyledLink />', () => {
      const accessibilityLabel = 'some label a11y';
      const item = mountWithAppProvider(
        <Item
          label="some label"
          url="foo"
          accessibilityLabel={accessibilityLabel}
        />,
        {
          context: {location: 'bar'},
        },
      );

      expect(item.find(UnstyledLink).prop('aria-label')).toBe(
        accessibilityLabel,
      );
    });

    it('delegates onClick to <UnstyledLink />', () => {
      const item = mountWithAppProvider(
        <Item
          label="some label"
          url="foo"
          disabled={false}
          onClick={jest.fn()}
        />,
        {context: {location: 'bar'}},
      );

      item.find(UnstyledLink).simulate('click');
      expect(item.prop('onClick')).toHaveBeenCalledTimes(1);
    });

    it('sets aria labels on <button />', () => {
      const item = mountWithAppProvider(
        <Item
          label="some label"
          accessibilityLabel="some a11y label"
          disabled={false}
          onClick={noop}
        />,
        {context: {location: 'bar'}},
      );

      expect(item.find('button').props()).toMatchObject({
        'aria-disabled': false,
        'aria-label': 'some a11y label',
      });
    });

    it('calls onNavDismiss from context on click', () => {
      const context = {
        location: 'foo',
        onNavDismiss: jest.fn(),
      };

      const item = mountWithAppProvider(
        <Item label="some label" url="foo" disabled={false} />,
        {context},
      );
      item.find(UnstyledLink).simulate('click');
      expect(context.onNavDismiss).toHaveBeenCalledTimes(1);
    });

    it('calls onNavDismiss from context on sub item click', () => {
      const context = {
        location: 'foo',
        onNavDismiss: jest.fn(),
      };

      const item = mountWithAppProvider(
        <Item
          label="some label"
          url="foo"
          disabled={false}
          subNavItems={[
            {
              label: 'bar',
              url: 'baz',
              disabled: false,
            },
          ]}
        />,
        {context},
      );
      item
        .find(UnstyledLink)
        .last()
        .simulate('click');
      expect(context.onNavDismiss).toHaveBeenCalledTimes(1);
    });
  });
});

function itemForLocation(location: string, overrides: Partial<ItemProps> = {}) {
  return mountWithAppProvider(
    <Item
      label="some label"
      url="/admin/orders"
      disabled={false}
      subNavItems={[
        {
          url: '/admin/draft_orders',
          disabled: false,
          label: 'draft orders',
        },
      ]}
      {...overrides}
    />,
    {
      context: {location},
    },
  );
}
