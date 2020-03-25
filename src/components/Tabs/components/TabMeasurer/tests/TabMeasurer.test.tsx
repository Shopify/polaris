import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {TabMeasurer} from '../TabMeasurer';
import {Tab} from '../../Tab';
import {Item} from '../../Item';

const originalNodeEnv = process.env.NODE_ENV;

describe('<TabMeasurer />', () => {
  let requestAnimationFrameSpy: jest.SpyInstance;
  let setTimeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
    requestAnimationFrameSpy.mockImplementation((cb: () => number) => {
      cb();
      return 1;
    });
    setTimeoutSpy = jest.spyOn(window, 'setTimeout');
  });

  afterEach(() => {
    requestAnimationFrameSpy.mockRestore();
    setTimeoutSpy.mockRestore();
    process.env.NODE_ENV = originalNodeEnv;
  });

  const mockProps = {
    tabToFocus: 0,
    activator: <Item id="id" focused />,
    selected: 1,
    tabs: [
      {
        id: 'repeat-customers',
        content: 'repeat-customers',
      },
      {
        id: 'prospects',
        content: 'prospects',
      },
    ],
    siblingTabHasFocus: false,
    handleMeasurement: noop,
  };

  it('calls setTimeout in development to delay measurements', () => {
    process.env.NODE_ENV = 'development';
    mountWithApp(<TabMeasurer {...mockProps} tabToFocus={0} />);
    // The second invocation is from the react scheduler
    // https://github.com/facebook/react/blob/0cf22a56a18790ef34c71bef14f64695c0498619/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L53
    expect(setTimeoutSpy).toHaveBeenCalledTimes(2);
  });

  describe('tabToFocus', () => {
    const tabToFocus = 0;

    it('passes focused value of 0 to Tab', () => {
      const tabMeasurer = mountWithAppProvider(
        <TabMeasurer {...mockProps} tabToFocus={tabToFocus} />,
      );
      const tabs = tabMeasurer.find(Tab);
      expect(tabs.first().prop('focused')).toBe(true);
    });

    it('does not pass wrong focused value to Tab', () => {
      const tabMeasurer = mountWithAppProvider(
        <TabMeasurer {...mockProps} tabToFocus={tabToFocus} />,
      );
      const tabs = tabMeasurer.find(Tab);
      expect(tabs.last().prop('focused')).toBe(false);
    });
  });

  describe('siblingTabHasFocus', () => {
    it('gets passed to Tab', () => {
      const siblingTabHasFocus = true;
      const tabMeasurer = mountWithAppProvider(
        <TabMeasurer {...mockProps} siblingTabHasFocus={siblingTabHasFocus} />,
      );
      const tabs = tabMeasurer.find(Tab);
      expect(tabs.first().prop('siblingTabHasFocus')).toBe(true);
    });
  });

  describe('activator', () => {
    it('renders activator', () => {
      const activator = <Item id="id" focused />;
      const tabMeasurer = mountWithAppProvider(
        <TabMeasurer {...mockProps} activator={activator} />,
      );
      expect(tabMeasurer.contains(activator)).toBe(true);
    });
  });

  describe('selected', () => {
    it('passes selected to Tab', () => {
      const selected = 1;
      const tabMeasurer = mountWithAppProvider(
        <TabMeasurer {...mockProps} selected={selected} />,
      );
      const tabs = tabMeasurer.find(Tab);
      expect(tabs.first().prop('selected')).toBe(false);
    });

    it('does not pass the wrong selected to Tab', () => {
      const selected = 1;
      const tabMeasurer = mountWithAppProvider(
        <TabMeasurer {...mockProps} selected={selected} />,
      );
      const tabs = tabMeasurer.find(Tab);
      expect(tabs.last().prop('selected')).toBe(true);
    });
  });

  describe('tabs', () => {
    it('renders a Tab for each item in tabs', () => {
      const tabs = [
        {
          id: 'repeat-customers',
          content: 'repeat-customers',
        },
        {
          id: 'prospects',
          content: 'prospects',
        },
      ];
      const tabMeasurer = mountWithAppProvider(
        <TabMeasurer {...mockProps} tabs={tabs} />,
      );
      expect(tabMeasurer.find(Tab)).toHaveLength(2);
    });
  });
});

function noop() {}
