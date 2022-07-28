import React from 'react';
import {PlusMinor, ExternalMinor} from '@shopify/polaris-icons';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {PolarisTestProvider} from '../../../../PolarisTestProvider';
import type {MediaQueryContext} from '../../../../../utilities/media-query';
import {Badge} from '../../../../Badge';
import {Icon} from '../../../../Icon';
import {Indicator} from '../../../../Indicator';
import {UnstyledLink} from '../../../../UnstyledLink';
import {NavigationContext} from '../../../context';
import {Item, ItemProps} from '../Item';
import {Secondary} from '../components';
import {Key} from '../../../../../types';
import en from '../../../../../../locales/en.json';
import {Tooltip} from '../../../../Tooltip';

describe('<Nav.Item />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('sets expanded to false on resize when !navigationBarCollapsed and location does not match', () => {
    const spy = jest.fn();
    matchMedia.setMedia(() => ({addListener: spy}));
    const item = mountWithNavigationProvider(
      <Item
        label="some label"
        url="/admin/orders"
        subNavigationItems={[
          {
            url: '/admin/draft_orders',
            disabled: false,
            label: 'draft orders',
          },
        ]}
      />,
      {
        location: '/admin/products',
      },
    );

    const mediaAddListener = spy.mock.calls[0][0];

    matchMedia.setMedia(() => ({matches: true}));

    item.find(UnstyledLink)!.trigger('onClick', {
      preventDefault: jest.fn(),
      currentTarget: {
        getAttribute: () => '/admin/orders',
      },
    });

    expect(item).toContainReactComponent(Secondary, {expanded: true});

    matchMedia.setMedia(() => ({matches: false}));
    mediaAddListener();
    item.forceUpdate();

    expect(item).toContainReactComponent(Secondary, {expanded: false});
  });

  it('remains expanded on resize when navigationBarCollapsed and location matches', () => {
    const item = itemForLocation('/admin/orders');

    matchMedia.setMedia(() => ({matches: true}));
    item!.find(UnstyledLink)!.trigger('onClick', {
      preventDefault: jest.fn(),
      currentTarget: {
        getAttribute: () => '/admin/orders',
      },
    });
    expect(item).toContainReactComponent(Secondary, {expanded: true});
    matchMedia.setMedia(() => ({matches: false}));
    expect(item).toContainReactComponent(Secondary, {expanded: true});
  });

  describe('renders', () => {
    it('renders a button when url is not provided', () => {
      const item = mountWithNavigationProvider(
        <Item
          label="some label"
          disabled={false}
          subNavigationItems={[
            {
              url: '/admin/draft_orders',
              disabled: false,
              label: 'draft orders',
            },
          ]}
        />,
        {
          location: '/admin/orders',
        },
      );

      expect(item).toContainReactComponent('button');
    });

    it('renders an UnstyledLink when url is provided', () => {
      const item = itemForLocation('/admin/orders');

      expect(item).toContainReactComponent(UnstyledLink);
    });

    it('renders a small badge with new status if the prop is provided with a string', () => {
      const item = mountWithNavigationProvider(
        <Item label="some label" badge="1" />,
      );

      expect(item).toContainReactComponent(Badge, {
        status: 'new',
        size: 'small',
        children: '1',
      });
    });

    it('renders a badge if the prop is provided with an element', () => {
      const item = mountWithNavigationProvider(
        <Item label="some label" badge={<Badge>Custom badge</Badge>} />,
      );

      expect(item.find(Badge)).toContainReactText('Custom badge');
    });

    it('renders a single new badge even if a badge prop is also provided', () => {
      const item = mountWithNavigationProvider(
        <Item label="some label" badge={<Badge>Custom badge</Badge>} new />,
      );

      expect(item).toContainReactComponentTimes(Badge, 1);
      expect(item.find(Badge)).toContainReactText('New');
    });

    it('renders an external icon if the prop is provided with an element', () => {
      const item = mountWithNavigationProvider(
        <Item label="some label" url="foo" external disabled={false} />,
        {
          location: 'bar',
        },
      );

      expect(item).toContainReactComponent(Icon, {
        accessibilityLabel: en.Polaris.Common.newWindowAccessibilityHint,
        source: ExternalMinor,
      });
    });
  });

  describe('with secondaryAction', () => {
    it('renders an external icon', () => {
      const item = mountWithNavigationProvider(
        <Item
          label="some label"
          url="foo"
          secondaryAction={{
            url: 'bar',
            icon: PlusMinor,
            accessibilityLabel: 'label',
          }}
        />,
        {
          location: 'bar',
        },
      );

      expect(item).toContainReactComponent(Icon, {
        source: PlusMinor,
      });
    });

    it('renders an UnstyledLink with props delegated', () => {
      const item = mountWithNavigationProvider(
        <Item
          label="some label"
          url="foo"
          secondaryAction={{
            url: 'bar',
            icon: PlusMinor,
            accessibilityLabel: 'label',
          }}
        />,
        {
          location: 'bar',
        },
      );

      expect(item).toContainReactComponent(UnstyledLink, {
        url: 'bar',
        'aria-label': 'label',
      });
    });

    it('renders an UnstyledLink with onClick handler if provided', () => {
      const handler = () => {};
      const item = mountWithNavigationProvider(
        <Item
          label="some label"
          url="foo"
          secondaryAction={{
            url: 'bar',
            icon: PlusMinor,
            onClick: handler,
            accessibilityLabel: 'label',
          }}
        />,
        {
          location: 'bar',
        },
      );

      expect(item).toContainReactComponent(UnstyledLink, {
        url: 'bar',
        'aria-label': 'label',
        onClick: handler,
      });
    });

    it('shows a tooltip for the secondary action if specified', () => {
      const item = mountWithNavigationProvider(
        <Item
          label="some label"
          url="foo"
          secondaryAction={{
            url: 'bar',
            icon: PlusMinor,
            accessibilityLabel: 'label',
            tooltip: {
              content: 'This is tooltip text',
            },
          }}
        />,
        {
          location: 'bar',
        },
      );

      expect(item).toContainReactComponent(Tooltip, {
        content: 'This is tooltip text',
      });
    });
  });

  describe('with SubNavigationItems', () => {
    it('renders expanded when given url is a perfect match for location', () => {
      const item = itemForLocation('/admin/orders');

      expect(item).toContainReactComponent(Secondary);
    });

    it('renders expanded when a url is a startsWith match for location', () => {
      const item = itemForLocation('/admin/orders?foo=bar');

      expect(item).toContainReactComponent(Secondary);
    });

    it('renders expanded when a child is a perfect match for location', () => {
      const item = itemForLocation('/admin/draft_orders');

      expect(item).toContainReactComponent(Secondary);
    });

    it('renders expanded when a child is a startsWith match for location', () => {
      const item = itemForLocation('/admin/draft_orders?foo=bar');

      expect(item).toContainReactComponent(Secondary);
    });

    it('does not render expanded when parent and children both have no match on the location', () => {
      const item = itemForLocation('/admin/notARealRoute');

      expect(item).toContainReactComponent(Secondary, {expanded: false});
    });

    it('sets aria labels', () => {
      const item = itemForLocation('/admin/notARealRoute');

      expect(item).toContainReactComponent('a', {
        'aria-expanded': false,
        'aria-controls': 'PolarisSecondaryNavigation1',
      });
    });

    it('sets aria-expanded to true when item with subNavItems is expanded', () => {
      const item = mountWithNavigationProvider(
        <Item
          label="some label"
          url="/admin/orders"
          subNavigationItems={[
            {
              url: '/admin/draft_orders',
              disabled: false,
              label: 'draft orders',
            },
          ]}
        />,
        {
          location: '/admin/orders',
        },
      );

      expect(item).toContainReactComponent(UnstyledLink, {
        'aria-expanded': true,
      });
    });

    it('invokes the provided onClick handler', () => {
      const spy = jest.fn();
      const item = mountWithNavigationProvider(
        <Item
          label="some label"
          url="/admin/orders"
          subNavigationItems={[
            {
              url: '/admin/draft_orders',
              disabled: false,
              label: 'draft orders',
              onClick: spy,
            },
          ]}
        />,
        {
          location: '/admin/orders',
        },
      );

      item!
        .find(Secondary)!
        .find('a')!
        .trigger('onClick', {
          preventDefault: jest.fn(),
          currentTarget: {
            getAttribute: () => '/admin/draft_orders',
          },
        });

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('invokes onNavDismiss even if a custom onClick is provided', () => {
      const spy = jest.fn();
      const item = mountWithNavigationProvider(
        <Item
          label="some label"
          url="/admin/orders"
          subNavigationItems={[
            {
              url: '/admin/draft_orders',
              disabled: false,
              label: 'draft orders',
              onClick: noop,
            },
          ]}
        />,
        {
          location: '/admin/orders',
          onNavigationDismiss: spy,
        },
      );

      item!
        .find(Secondary)!
        .find('a')!
        .trigger('onClick', {
          preventDefault: jest.fn(),
          currentTarget: {
            getAttribute: () => '/admin/draft_orders',
          },
        });

      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('with exactMatch true', () => {
    it('renders expanded when given url is a perfect match for location', () => {
      const item = itemForLocation('/admin/orders', {exactMatch: true});

      expect(item).toContainReactComponent(Secondary);
    });

    it('does not render expanded when no exact match on url', () => {
      const item = itemForLocation('/admin/orders/1', {exactMatch: true});

      expect(item).toContainReactComponent(Secondary, {expanded: false});
    });

    it('still renders expanded when there is a match on url for one of it`s children', () => {
      const item = itemForLocation('/admin/draft_orders', {exactMatch: true});

      expect(item).toContainReactComponent(Secondary);
    });
  });

  describe('delegated props', () => {
    it('delegates icon to <Icon />', () => {
      const item = mountWithNavigationProvider(
        <Item label="some label" url="foo" disabled={false} icon={PlusMinor} />,
        {
          location: 'bar',
        },
      );

      expect(item).toContainReactComponent(Icon, {
        source: PlusMinor,
      });
    });

    it('delegates label to <UnstyledLink />', () => {
      const item = mountWithNavigationProvider(
        <Item url="foo" disabled={false} label="baz" />,
        {
          location: 'bar',
        },
      );

      expect(item.find(UnstyledLink)).toContainReactText('baz');
    });

    it('delegates url to <UnstyledLink />', () => {
      const item = mountWithNavigationProvider(
        <Item label="some label" url="foo" disabled={false} />,
        {
          location: 'bar',
        },
      );

      expect(item).toContainReactComponent(UnstyledLink, {
        url: 'foo',
      });
    });

    it('delegates external to <UnstyledLink />', () => {
      const item = mountWithNavigationProvider(
        <Item label="some label" url="foo" external disabled={false} />,
        {
          location: 'bar',
        },
      );

      expect(item).toContainReactComponent(UnstyledLink, {
        url: 'foo',
        external: true,
      });
    });

    it('delegates disabled to <UnstyledLink />', () => {
      const item = mountWithNavigationProvider(
        <Item label="some label" url="foo" disabled />,
        {
          location: 'bar',
        },
      );

      expect(item).toContainReactComponent(UnstyledLink, {
        'aria-disabled': true,
      });
    });

    it('delegates accessibilityLabel to <UnstyledLink />', () => {
      const accessibilityLabel = 'some label a11y';
      const item = mountWithNavigationProvider(
        <Item
          label="some label"
          url="foo"
          accessibilityLabel={accessibilityLabel}
        />,
        {
          location: 'bar',
        },
      );

      expect(item).toContainReactComponent(UnstyledLink, {
        'aria-label': accessibilityLabel,
      });
    });

    it('delegates onClick to <UnstyledLink />', () => {
      const spy = jest.fn();
      const item = mountWithNavigationProvider(
        <Item label="some label" url="foo" disabled={false} onClick={spy} />,
        {location: 'bar'},
      );
      const link = item.find(UnstyledLink)!.find('a');
      link!.trigger('onClick', {
        currentTarget: link!.domNode as HTMLDivElement,
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('sets aria labels on <button />', () => {
      const item = mountWithNavigationProvider(
        <Item
          label="some label"
          accessibilityLabel="some a11y label"
          disabled={false}
          onClick={noop}
        />,
        {location: 'bar'},
      );

      expect(item).toContainReactComponent('button', {
        'aria-disabled': false,
        'aria-label': 'some a11y label',
      });
    });

    it('calls onNavigationDismiss from context on click', () => {
      const context = {
        location: 'foo',
        onNavigationDismiss: jest.fn(),
      };

      const item = mountWithNavigationProvider(
        <Item label="some label" url="foo" disabled={false} />,
        {...context},
      );
      item
        .find(UnstyledLink)!
        .find('a')!
        .trigger('onClick', {
          preventDefault: jest.fn(),
          currentTarget: {
            getAttribute: () => 'foo',
          },
        });
      expect(context.onNavigationDismiss).toHaveBeenCalledTimes(1);
    });

    it('calls onNavigationDismiss from context on sub item click', () => {
      const context = {
        location: 'foo',
        onNavigationDismiss: jest.fn(),
      };

      const item = mountWithNavigationProvider(
        <Item
          label="some label"
          url="foo"
          disabled={false}
          subNavigationItems={[
            {
              label: 'bar',
              url: 'baz',
              disabled: false,
            },
          ]}
        />,
        {...context},
      );
      item
        .find(UnstyledLink)!
        .find('a')!
        .trigger('onClick', {
          preventDefault: jest.fn(),
          currentTarget: {
            getAttribute: () => 'foo',
          },
        });
      expect(context.onNavigationDismiss).toHaveBeenCalledTimes(1);
    });
  });

  it('renders an indicator if a sub navigation item is marked as new', () => {
    const spy = jest.fn();
    matchMedia.setMedia(() => ({addListener: spy}));
    const item = mountWithNavigationProvider(
      <Item
        label="some label"
        url="/admin/orders"
        subNavigationItems={[
          {
            url: '/admin/draft_orders',
            disabled: false,
            label: 'draft orders',
            new: true,
          },
        ]}
      />,
      {
        location: '/admin/products',
      },
    );

    expect(item).toContainReactComponent(Indicator);
  });

  it('renders a new badge on sub navigation item if marked as new', () => {
    const spy = jest.fn();
    matchMedia.setMedia(() => ({addListener: spy}));
    const item = mountWithNavigationProvider(
      <Item
        label="some label"
        url="/admin/orders"
        subNavigationItems={[
          {
            url: '/admin/orders',
            disabled: false,
            label: 'orders',
          },
          {
            url: '/admin/draft_orders',
            disabled: false,
            label: 'draft orders',
            new: true,
          },
        ]}
      />,
      {
        location: '/admin/orders',
      },
    );

    expect(item).toContainReactComponent(Badge);
  });

  describe('small screens', () => {
    let matchMedia: jest.SpyInstance;

    beforeEach(() => {
      matchMedia = jest.spyOn(window, 'matchMedia');
      matchMedia.mockImplementation(() => {
        return {
          matches: true,
          addListener() {},
          removeListener() {},
        };
      });
    });

    afterEach(() => {
      matchMedia.mockRestore();
    });

    describe('onClick', () => {
      it('will fire once on small screens when onNavigationDismiss is defined', () => {
        const spy = jest.fn();
        const item = mountWithNavigationProvider(
          <Item label="some label" disabled={false} onClick={spy} />,
          {
            location: 'bar',
            onNavigationDismiss: noop,
          },
        );

        item.find('button')!.trigger('onClick', {
          preventDefault: jest.fn(),
          currentTarget: {
            getAttribute: () => 'baz',
          },
        });
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('will fire once on small screens when onNavigationDismiss is undefined', () => {
        const spy = jest.fn();
        const item = mountWithNavigationProvider(
          <Item label="some label" disabled={false} onClick={spy} />,
          {
            location: 'bar',
          },
        );

        item.find('button')!.trigger('onClick', {
          preventDefault: jest.fn(),
          currentTarget: {
            getAttribute: () => 'baz',
          },
        });
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('onToggleExpandedState', () => {
      it('fires the onToggleExpandedState handler when clicked', () => {
        const onToggleExpandedState = jest.fn();
        const item = mountWithNavigationAndPolarisTestProvider(
          <Item
            label="some label"
            disabled={false}
            url="/admin/orders"
            onToggleExpandedState={onToggleExpandedState}
            subNavigationItems={[{label: 'sub item', url: '/sub-item'}]}
          />,
          {location: '/admin/orders'},
          {isNavigationCollapsed: true},
        );
        item?.find('a')?.trigger('onClick', {
          preventDefault: jest.fn(),
          currentTarget: {
            getAttribute: () => 'baz',
          },
        });
        expect(onToggleExpandedState).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('keyFocused', () => {
    it('adds and removes a class to button when item was tabbed into focus and then blurred', () => {
      const item = mountWithNavigationProvider(
        <Item label="some label" disabled={false} />,
      );

      const event = {
        keyCode: Key.Tab,
      };

      item.find('button')!.trigger('onKeyUp', event);
      expect(item).toContainReactComponent('button', {
        className: 'Item keyFocused',
      });

      item.find('button')!.trigger('onBlur');
      expect(item).toContainReactComponent('button', {
        className: 'Item',
      });
    });

    it('adds and removes a class to a link when item was tabbed into focus and then blurred', () => {
      const item = mountWithNavigationProvider(
        <Item label="some label" disabled={false} url="https://shopify.com" />,
      );

      const event = {
        keyCode: Key.Tab,
      };

      item.find('a')!.trigger('onKeyUp', event);
      expect(item).toContainReactComponent('a', {
        className: 'Item keyFocused',
      });

      item.find('a')!.trigger('onBlur');
      expect(item).toContainReactComponent('a', {
        className: 'Item',
      });
    });
  });
});

function noop() {}

function itemForLocation(location: string, overrides: Partial<ItemProps> = {}) {
  return mountWithNavigationProvider(
    <Item
      label="some label"
      url="/admin/orders"
      disabled={false}
      subNavigationItems={[
        {
          url: '/admin/draft_orders',
          disabled: false,
          label: 'draft orders',
        },
      ]}
      {...overrides}
    />,
    {location},
  ).find(Item);
}

function mountWithNavigationProvider(
  node: React.ReactElement,
  context: React.ContextType<typeof NavigationContext> = {location: ''},
) {
  return mountWithApp(
    <NavigationContext.Provider value={context}>
      {node}
    </NavigationContext.Provider>,
  );
}

function mountWithNavigationAndPolarisTestProvider(
  node: React.ReactElement,
  navigationContext: React.ContextType<typeof NavigationContext> = {
    location: '',
  },
  mediaQueryContext: React.ContextType<typeof MediaQueryContext> = {
    isNavigationCollapsed: false,
  },
) {
  return mountWithApp(
    <NavigationContext.Provider value={navigationContext}>
      <PolarisTestProvider mediaQuery={mediaQueryContext}>
        {node}
      </PolarisTestProvider>
    </NavigationContext.Provider>,
  );
}
