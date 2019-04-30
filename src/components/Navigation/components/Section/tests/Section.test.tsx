import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';

import {matchMedia, animationFrame} from '@shopify/jest-dom-mocks';
import {findByTestID, trigger, mountWithAppProvider} from 'test-utilities';

import {NavigationContext} from '../../../types';
import {Provider} from '../../Context';
import Item from '../../Item';
import Section from '../Section';

import channelResults from './fixtures/AdminNavQuery/multiple-channels.json';

describe('<Navigation.Section />', () => {
  let context: NavigationContext;

  beforeEach(() => {
    matchMedia.mock();
    animationFrame.mock();
    context = {
      location: '/admin/products',
      onNavigationDismiss: jest.fn(),
    };
  });

  afterEach(() => {
    matchMedia.restore();
    animationFrame.restore();
  });

  it('passes the right accessibilityLabel to its Button', () => {
    const mountedSection = mountWithNavigationProvider(
      <Section
        title="test"
        items={[
          {
            label: 'some label',
            url: '/admin',
            disabled: false,
          },
        ]}
        action={{
          icon: 'placeholder',
          accessibilityLabel: 'This is a test section',
          onClick: noop,
        }}
      />,
      {...context},
    );

    expect(
      mountedSection.find('[aria-label="This is a test section"]'),
    ).toHaveLength(1);
  });

  it('calls iconButton.onClick when icon is clicked', () => {
    const spy = jest.fn();

    const section = mountWithNavigationProvider(
      <Section
        title="test"
        items={[
          {
            label: 'some label',
            url: '/admin',
            disabled: false,
          },
        ]}
        action={{
          icon: 'placeholder',
          accessibilityLabel: 'This is a test section',
          onClick: spy,
        }}
      />,
      {...context},
    );

    section.find('button').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders an array of items from props', () => {
    const section = mountWithNavigationProvider(
      <Section items={channelResults} />,
      {
        ...context,
      },
    );

    expect(section.find('li').length === channelResults.length).toBe(true);
  });

  it('calls onNavigationDismiss from context on sub item click', () => {
    const channels = mountWithNavigationProvider(
      <Section items={channelResults} />,
      {
        ...context,
      },
    );

    channels
      .find('a')
      .first()
      .simulate('click');
    animationFrame.runFrame();

    expect(context.onNavigationDismiss).toHaveBeenCalledTimes(1);
  });

  it('sets expanded to false on item click', () => {
    const channels = mountWithNavigationProvider(
      <Section items={channelResults} />,
      {
        ...context,
      },
    );

    channels.setState({expanded: true});

    channels
      .find('a')
      .first()
      .simulate('click');

    animationFrame.runFrame();

    expect(channels.state('expanded')).toBe(false);
  });

  it('adds a toggle button if rollupAfter has a value', () => {
    const channels = mountWithNavigationProvider(
      <Section
        rollup={{
          after: 3,
          activePath: 'admin/themes',
          view: 'View all',
          hide: 'Hide',
        }}
        items={channelResults}
      />,
      {...context},
    );

    expect(findByTestID(channels, 'ToggleViewAll').exists()).toBe(true);
  });

  it('passes the props to Item', () => {
    const section = mountWithNavigationProvider(
      <Section
        title="test"
        items={[
          {
            label: 'some label',
            url: '/admin',
            disabled: false,
          },
        ]}
        action={{
          icon: 'placeholder',
          accessibilityLabel: 'This is a test section',
          onClick: noop,
        }}
        separator
      />,
      {...context},
    );

    expect(section.find(Item).props()).toMatchObject({
      url: '/admin',
      disabled: false,
      label: 'some label',
    });
  });

  it('calls onClick callback when onClick on Item is triggered', () => {
    const onClickSpy = jest.fn();
    const section = mountWithNavigationProvider(
      <Section
        title="test"
        items={[
          {
            label: 'some label',
            url: '/admin',
            disabled: false,
            onClick: onClickSpy,
          },
        ]}
        action={{
          icon: 'placeholder',
          accessibilityLabel: 'This is a test section',
          onClick: noop,
        }}
        separator
      />,
      {...context},
    );

    trigger(section.find(Item), 'onClick');
    animationFrame.runFrame();

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
});

function mountWithNavigationProvider(
  node: React.ReactElement<any>,
  context: NavigationContext = {location: ''},
) {
  return mountWithAppProvider(<Provider value={context}>{node}</Provider>);
}
