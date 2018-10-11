import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'test-utilities';
import TabMeasurer from '../TabMeasurer';
import Tab from '../../Tab';
import Item from '../../Item';

describe('<TabMeasurer />', () => {
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
