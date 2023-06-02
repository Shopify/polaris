import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';

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
    matchMedia.mock();
  });

  afterEach(() => {
    requestAnimationFrameSpy.mockRestore();
    setTimeoutSpy.mockRestore();
    process.env.NODE_ENV = originalNodeEnv;
    matchMedia.restore();
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
    expect(setTimeoutSpy).toHaveBeenCalled();
  });

  describe('tabToFocus', () => {
    const tabToFocus = 0;

    it('passes focused value of 0 to Tab', () => {
      const tabMeasurer = mountWithApp(
        <TabMeasurer {...mockProps} tabToFocus={tabToFocus} />,
      );
      expect(tabMeasurer).toContainReactComponent(Tab, {
        id: 'repeat-customersMeasurer',
        focused: true,
      });
    });

    it('does not pass wrong focused value to Tab', () => {
      const tabMeasurer = mountWithApp(
        <TabMeasurer {...mockProps} tabToFocus={tabToFocus} />,
      );

      expect(tabMeasurer).toContainReactComponent(Tab, {
        id: 'prospectsMeasurer',
        focused: false,
      });
    });
  });

  describe('siblingTabHasFocus', () => {
    it('gets passed to Tab', () => {
      const siblingTabHasFocus = true;
      const tabMeasurer = mountWithApp(
        <TabMeasurer {...mockProps} siblingTabHasFocus={siblingTabHasFocus} />,
      );

      expect(tabMeasurer).toContainReactComponent(Tab, {
        id: 'prospectsMeasurer',
        siblingTabHasFocus: true,
      });
    });
  });

  describe('activator', () => {
    it('renders activator', () => {
      const activator = <Item id="id" focused />;
      const tabMeasurer = mountWithApp(
        <TabMeasurer {...mockProps} activator={activator} />,
      );
      expect(tabMeasurer).toContainReactComponent(Item, {
        id: 'id',
      });
    });
  });

  describe('selected', () => {
    it('passes selected to Tab', () => {
      const selected = 1;
      const tabMeasurer = mountWithApp(
        <TabMeasurer {...mockProps} selected={selected} />,
      );
      expect(tabMeasurer).toContainReactComponent(Tab, {
        id: 'prospectsMeasurer',
        selected: true,
      });
    });

    it('does not pass the wrong selected to Tab', () => {
      const selected = 1;
      const tabMeasurer = mountWithApp(
        <TabMeasurer {...mockProps} selected={selected} />,
      );

      expect(tabMeasurer).toContainReactComponent(Tab, {
        id: 'repeat-customersMeasurer',
        selected: false,
      });
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
      const tabMeasurer = mountWithApp(
        <TabMeasurer {...mockProps} tabs={tabs} />,
      );

      expect(tabMeasurer).toContainReactComponentTimes(Tab, 2);
    });
  });
});

function noop() {}
