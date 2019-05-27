import React from 'react';
import {ReactWrapper} from 'enzyme';
import {mountWithAppProvider, trigger} from 'test-utilities';
import {Tab, Panel, TabMeasurer, List} from '../components';
import Tabs, {Props} from '../Tabs';
import {getVisibleAndHiddenTabIndices} from '../utilities';
import Popover from '../../Popover';

describe('<Tabs />', () => {
  const tabs: Props['tabs'] = [
    {content: 'Tab 1', id: 'tab-1'},
    {content: 'Tab 2', id: 'tab-2'},
  ];

  const mockProps = {
    selected: 0,
    tabs,
    onSelect: noop,
  };

  function getPopoverContents(tabs: ReactWrapper) {
    return mountWithAppProvider(
      <div>{tabs.find(Popover).prop('children')}</div>,
    );
  }

  afterEach(() => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
  });

  describe('tabs', () => {
    it('uses the IDs passed in for the tabs', () => {
      const tabs: Props['tabs'] = [
        {content: 'Tab 1', id: 'tab-1'},
        {content: 'Tab 2', id: 'tab-2'},
      ];
      const wrapper = mountWithAppProvider(<Tabs {...mockProps} tabs={tabs} />);

      tabs.forEach((tab, index) => {
        expect(
          wrapper
            .find(Tab)
            .at(index)
            .prop('id'),
        ).toBe(tab.id);
      });
    });

    it('uses the panelID passed in for the tabs', () => {
      const panelIDedTabs = [
        {...tabs[0], panelID: 'panel-1'},
        {...tabs[1], panelID: 'panel-2'},
      ];
      const wrapper = mountWithAppProvider(
        <Tabs {...mockProps} tabs={panelIDedTabs} />,
      );

      panelIDedTabs.forEach((tab, index) => {
        expect(
          wrapper
            .find(Tab)
            .at(index)
            .prop('panelID'),
        ).toBe(tab.panelID);
      });
    });

    it('uses an auto-generated panelID if none is provided', () => {
      const wrapper = mountWithAppProvider(<Tabs {...mockProps} />);

      tabs.forEach((_, index) => {
        const panelID = wrapper
          .find(Tab)
          .at(index)
          .prop('panelID');
        expect(typeof panelID).toBe('string');
        expect(panelID).not.toBe('');
      });
    });

    it('sets the tab URL if passed in the tab descriptor', () => {
      const urlTabs = [
        {...tabs[0], url: 'https://shopify.com'},
        {...tabs[1], url: 'https://google.com'},
      ];
      const wrapper = mountWithAppProvider(
        <Tabs {...mockProps} tabs={urlTabs} />,
      );

      urlTabs.forEach((tab, index) => {
        expect(
          wrapper
            .find(Tab)
            .at(index)
            .prop('url'),
        ).toStrictEqual(tab.url);
      });
    });

    it('sets the accessibility label for each of the tabs', () => {
      const labelledTabs = [
        {...tabs[0], accessibilityLabel: 'Tab 1'},
        {...tabs[1], accessibilityLabel: 'Tab 2'},
      ];
      const wrapper = mountWithAppProvider(
        <Tabs {...mockProps} tabs={labelledTabs} />,
      );

      labelledTabs.forEach((tab, index) => {
        expect(
          wrapper
            .find(Tab)
            .at(index)
            .prop('accessibilityLabel'),
        ).toStrictEqual(tab.accessibilityLabel);
      });
    });

    it('sets the content for each of the tabs if given content', () => {
      const tabsWithContent = [
        {content: 'Tab 1', id: 'tab-1'},
        {content: 'Tab 2', id: 'tab-2'},
      ];
      const wrapper = mountWithAppProvider(
        <Tabs {...mockProps} tabs={tabsWithContent} />,
      );

      tabsWithContent.forEach((tab, index) => {
        expect(
          wrapper
            .find(Tab)
            .at(index)
            .prop('children'),
        ).toStrictEqual(tab.content);
      });
    });
  });

  describe('children', () => {
    it('wraps the children in a Panel with matching aria attributes to the tab', () => {
      const content = <p>Tab content</p>;
      const wrapper = mountWithAppProvider(
        <Tabs {...mockProps}>{content}</Tabs>,
      );

      const selectedTab = wrapper.find(Tab).at(0);
      const panel = wrapper.find(Panel);
      expect(panel.exists()).toBe(true);
      expect(panel.contains(content)).toBe(true);
      expect(panel.prop('id')).toBeTruthy();
      expect(panel.prop('id')).toBe(selectedTab.prop('panelID'));
    });

    it('uses a custom panelID', () => {
      const panelIDedTabs = [
        {...tabs[0], panelID: 'my-custom-panel-id'},
        tabs[1],
      ];
      const content = <p>Tab content</p>;
      const wrapper = mountWithAppProvider(
        <Tabs {...mockProps} tabs={panelIDedTabs}>
          {content}
        </Tabs>,
      );

      const panel = wrapper.find(Panel);
      const selectedTab = wrapper.find(Tab).at(0);
      expect(panel.prop('id')).toBe(selectedTab.prop('panelID'));
    });
  });

  describe('onSelect()', () => {
    it('is called with the index of the clicked tab', () => {
      const spy = jest.fn();
      const wrapper = mountWithAppProvider(
        <Tabs {...mockProps} onSelect={spy} />,
      );
      wrapper
        .find(Tab)
        .at(1)
        .find('button')
        .simulate('click');
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe('<TabMeasurer />', () => {
    const mockTabs = [
      {content: 'Tab 1', id: 'tab-1'},
      {content: 'Tab 2', id: 'tab-2'},
      {content: 'Tab 3', id: 'tab-3'},
    ];

    it('passes the provided selected value if given', () => {
      const tabs = mountWithAppProvider(
        <Tabs {...mockProps} selected={1} tabs={mockTabs} />,
      );
      expect(tabs.find(TabMeasurer).prop('selected')).toBe(1);
    });
  });

  describe('getVisibleAndHiddenTabIndices()', () => {
    it('sets getVisibleAndHiddenTabIndices with visibleTabs and hiddenTabs', () => {
      const mockTabs = [
        {content: 'Tab 1', id: 'tab-1'},
        {content: 'Tab 2', id: 'tab-2'},
        {content: 'Tab 3', id: 'tab-3'},
        {content: 'Tab 4', id: 'tab-4'},
        {content: 'Tab 5', id: 'tab-5'},
        {content: 'Tab 6', id: 'tab-6'},
      ];
      const selected = 0;
      const disclosureWidth = 50;
      const tabWidths = [82, 160, 150, 100, 80, 120];
      const containerWidth = 300;
      const actualIndices = getVisibleAndHiddenTabIndices(
        mockTabs,
        selected,
        disclosureWidth,
        tabWidths,
        containerWidth,
      );
      const expectedIndices = {visibleTabs: [0, 1], hiddenTabs: [2, 3, 4, 5]};
      expect(actualIndices).toStrictEqual(expectedIndices);
    });
  });

  describe('<Popover />', () => {
    it('passes preferredPosition below to the Popover', () => {
      const tabs = mountWithAppProvider(<Tabs {...mockProps} />);
      const tabMeasurer = tabs.find(TabMeasurer);
      trigger(tabMeasurer, 'handleMeasurement', {
        hiddenTabWidths: [82, 160, 150, 100, 80, 120],
        containerWidth: 300,
        disclosureWidth: 0,
      });

      const popover = tabs.find(Popover);
      expect(popover.prop('preferredPosition')).toBe('below');
    });

    it('renders with a button as the activator when there are hiddenTabs', () => {
      const tabs = mountWithAppProvider(<Tabs {...mockProps} />);
      const tabMeasurer = tabs.find(TabMeasurer);
      trigger(tabMeasurer, 'handleMeasurement', {
        hiddenTabWidths: [82, 160, 150, 100, 80, 120],
        containerWidth: 300,
        disclosureWidth: 0,
      });

      const popover = tabs.find(Popover);
      expect(popover.prop('activator').type).toBe('button');
    });
  });
});

function noop() {}
