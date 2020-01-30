import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {Tab, Panel, TabMeasurer} from '../components';
import {Tabs, TabsProps} from '../Tabs';
import {getVisibleAndHiddenTabIndices} from '../utilities';
import {Popover} from '../../Popover';

describe('<Tabs />', () => {
  const tabs: TabsProps['tabs'] = [
    {content: 'Tab 1', id: 'tab-1'},
    {content: 'Tab 2', id: 'tab-2'},
  ];

  const mockProps = {
    tabs,
    selected: 0,
    onSelect: noop,
  };

  afterEach(() => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
  });

  describe('tabs', () => {
    it('uses the IDs passed in for the tabs', () => {
      const tabs: TabsProps['tabs'] = [
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

  describe('selected', () => {
    let getElementById: jest.SpyInstance;
    let panelStub: {focus: jest.Mock};

    beforeEach(() => {
      panelStub = {focus: jest.fn()};
      getElementById = jest.spyOn(document, 'getElementById');
      getElementById.mockReturnValue(panelStub);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('focuses the panel when a tab becomes selected', () => {
      const panelIDedTabs = [
        {...tabs[0], panelID: 'panel-1'},
        {...tabs[1], panelID: 'panel-2'},
      ];

      const wrapper = mountWithAppProvider(
        <Tabs {...mockProps} tabs={panelIDedTabs}>
          Panel contents
        </Tabs>,
      );
      wrapper.setProps({selected: 1});
      expect(panelStub.focus).toHaveBeenCalled();
    });
  });

  describe('panel', () => {
    it('renders a Panel for each of the Tabs', () => {
      const content = <p>Tab content</p>;
      const wrapper = mountWithAppProvider(
        <Tabs {...mockProps}>{content}</Tabs>,
      );
      const panel = wrapper.find(Panel);
      expect(panel).toHaveLength(2);
    });

    it('renders a Panel with a hidden prop for the non selected tabs', () => {
      const content = <p>Tab content</p>;
      const wrapper = mountWithAppProvider(
        <Tabs {...mockProps}>{content}</Tabs>,
      );

      const nonSelectedPanel = wrapper.find(Panel).at(1);
      expect(nonSelectedPanel.prop('hidden')).toBe(true);
    });

    it('wraps the children in a Panel with matching aria attributes to the tab', () => {
      const content = <p>Tab content</p>;
      const wrapper = mountWithAppProvider(
        <Tabs {...mockProps}>{content}</Tabs>,
      );

      const selectedTab = wrapper.find(Tab).at(0);
      const panel = wrapper.find(Panel).at(0);
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

      const panel = wrapper.find(Panel).at(0);
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

    it('is not set to anything by default', () => {
      const tabs = mountWithAppProvider(<Tabs {...mockProps} />);
      expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(-1);
    });

    it('passes the provided selected value if given', () => {
      const tabs = mountWithAppProvider(
        <Tabs {...mockProps} selected={1} tabs={mockTabs} />,
      );
      expect(tabs.find(TabMeasurer).prop('selected')).toBe(1);
    });

    describe('ArrowRight', () => {
      it('shifts focus to the next tab when pressing ArrowRight', () => {
        const tabs = mountWithAppProvider(
          <Tabs {...mockProps} tabs={mockTabs} />,
        );
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowRight',
        });
        expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(0);
      });

      it('shifts focus to the first tab when pressing ArrowRight on the last tab', () => {
        const tabs = mountWithAppProvider(
          <Tabs {...mockProps} tabs={mockTabs} />,
        );
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowRight',
        });
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowRight',
        });
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowRight',
        });
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowRight',
        });
        expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(0);
      });
    });

    describe('ArrowDown', () => {
      it('shifts focus to the next tab when pressing ArrowDown', () => {
        const tabs = mountWithAppProvider(
          <Tabs {...mockProps} tabs={mockTabs} />,
        );
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowDown',
        });
        expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(0);
      });

      it('shifts focus to the first tab when pressing ArrowDown on the last tab', () => {
        const tabs = mountWithAppProvider(
          <Tabs {...mockProps} tabs={mockTabs} />,
        );
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowDown',
        });
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowDown',
        });
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowDown',
        });
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowDown',
        });
        expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(0);
      });
    });

    describe('ArrowLeft', () => {
      it('shifts focus to the last tab when pressing ArrowLeft', () => {
        const tabs = mountWithAppProvider(
          <Tabs {...mockProps} tabs={mockTabs} />,
        );
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowLeft',
        });
        expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(2);
      });
    });

    describe('ArrowUp', () => {
      it('shifts focus to the last tab when pressing ArrowUp', () => {
        const tabs = mountWithAppProvider(
          <Tabs {...mockProps} tabs={mockTabs} selected={0} />,
        );
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowUp',
        });
        expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(2);
      });

      it('shifts focus to the first tab when pressing ArrowUp on the second tab', () => {
        const tabs = mountWithAppProvider(
          <Tabs {...mockProps} tabs={mockTabs} />,
        );
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowRight',
        });
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowRight',
        });
        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowLeft',
        });
        expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(0);
      });
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

    describe('ArrowRight', () => {
      it('shifts focus to the first tab when pressing ArrowRight', () => {
        const tabs = mountWithAppProvider(<Tabs {...mockProps} />);
        const tabMeasurer = tabs.find(TabMeasurer);
        trigger(tabMeasurer, 'handleMeasurement', {
          hiddenTabWidths: [82, 160, 150, 100, 80, 120],
          containerWidth: 300,
          disclosureWidth: 0,
        });

        const popover = tabs.find(Popover);
        const disclosureActivator = popover.find('.DisclosureActivator');

        trigger(disclosureActivator, 'onClick', {
          key: 'Enter',
        });

        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowRight',
        });

        expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(0);
      });

      it('shifts focus to the first hidden tab when the last visible tab is focused and the disclosure popover is active', () => {
        const tabs = mountWithAppProvider(<Tabs {...mockProps} />);
        const tabMeasurer = tabs.find(TabMeasurer);
        trigger(tabMeasurer, 'handleMeasurement', {
          hiddenTabWidths: [82, 160, 150, 100, 80, 120],
          containerWidth: 300,
          disclosureWidth: 0,
        });
        const popover = tabs.find(Popover);
        const disclosureActivator = popover.find('button');

        disclosureActivator.simulate('click');

        trigger(disclosureActivator, 'onClick', {
          key: 'Enter',
        });

        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowRight',
        });

        expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(0);

        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowRight',
        });

        expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(1);
      });

      it('does not shift focus to the first hidden tab when the last visible tab is focused and the disclosure popover is not active', () => {
        const tabs = mountWithAppProvider(<Tabs {...mockProps} />);
        const tabMeasurer = tabs.find(TabMeasurer);
        trigger(tabMeasurer, 'handleMeasurement', {
          hiddenTabWidths: [82, 160, 150, 100, 80, 120],
          containerWidth: 300,
          disclosureWidth: 0,
        });

        const popover = tabs.find(Popover);
        expect(popover.prop('active')).toBe(false);

        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'ArrowRight',
        });

        expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(0);

        trigger(tabs.find('ul'), 'onKeyUp', {
          key: 'Enter',
        });

        expect(tabs.find(TabMeasurer).prop('tabToFocus')).toBe(0);
      });
    });
  });
});

function noop() {}
