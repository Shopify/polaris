import * as React from 'react';
import * as PropTypes from 'prop-types';
import {noop} from '@shopify/javascript-utilities/other';

import {matchMedia, animationFrame} from '@shopify/jest-dom-mocks';
import {findByTestID, trigger, mountWithAppProvider} from 'test-utilities';

import Item from '../../Item';
import Section from '../Section';

// eslint-disable-next-line shopify/strict-component-boundaries
import channelResults from './fixtures/AdminNavQuery/multiple-channels.json';

interface Context {
  location?: string;
  onNavigationDismiss?(): void;
}

const childContextTypes = {
  location: PropTypes.string,
  onNavigationDismiss: PropTypes.func,
};

describe('<Navigation.Section />', () => {
  let context: Context;

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
    const mountedSection = mountWithAppProvider(
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
      {context, childContextTypes},
    );

    expect(
      mountedSection.find('[aria-label="This is a test section"]'),
    ).toHaveLength(1);
  });

  it('calls iconButton.onClick when icon is clicked', () => {
    const spy = jest.fn();

    const section = mountWithAppProvider(
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
      {context, childContextTypes},
    );

    section.find('button').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders an array of items from props', () => {
    const section = mountWithAppProvider(<Section items={channelResults} />, {
      context,
      childContextTypes,
    });

    expect(section.find('li').length === channelResults.length).toBe(true);
  });

  it('calls onNavigationDismiss from context on sub item click', () => {
    const channels = mountWithAppProvider(<Section items={channelResults} />, {
      context,
      childContextTypes,
    });

    channels
      .find('a')
      .first()
      .simulate('click');
    animationFrame.runFrame();

    expect(context.onNavigationDismiss).toHaveBeenCalledTimes(1);
  });

  it('sets expanded to false on item click', () => {
    const channels = mountWithAppProvider(<Section items={channelResults} />, {
      context,
    });

    channels.setState({expanded: true});

    channels
      .find('a')
      .first()
      .simulate('click');

    animationFrame.runFrame();

    expect(channels.state('expanded')).toBe(false);
  });

  it('adds a toggle button if rollupAfter has a value', () => {
    const channels = mountWithAppProvider(
      <Section
        rollup={{
          after: 3,
          activePath: 'admin/themes',
          view: 'View all',
          hide: 'Hide',
        }}
        items={channelResults}
      />,
      {context, childContextTypes},
    );

    expect(findByTestID(channels, 'ToggleViewAll').exists()).toBe(true);
  });

  it('passes the props to Item', () => {
    const section = mountWithAppProvider(
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
      {context, childContextTypes},
    );

    expect(section.find(Item).props()).toMatchObject({
      url: '/admin',
      disabled: false,
      label: 'some label',
    });
  });

  it('calls onClick callback when onClick on Item is triggered', () => {
    const onClickSpy = jest.fn();
    const section = mountWithAppProvider(
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
      {context, childContextTypes},
    );

    trigger(section.find(Item), 'onClick');
    animationFrame.runFrame();

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
});
