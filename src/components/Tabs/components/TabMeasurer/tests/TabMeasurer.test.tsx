import React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import TabMeasurer from '../TabMeasurer';
import Tab from '../../Tab';
import Item from '../../Item';

describe('<TabMeasurer />', () => {
  const mockProps = {
    activator: <Item id="id" />,
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

  describe('activator', () => {
    it('renders activator', () => {
      const activator = <Item id="id" />;
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
