import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Popover} from '../../Popover';
import {Tabs} from '..';
import type {TabProps, TabsProps} from '..';
import {Tab, Panel, CreateViewModal, TabMeasurer} from '../components';
import {Badge} from '../../Badge';
import {getVisibleAndHiddenTabIndices} from '../utilities';
import {UnstyledButton} from '../../UnstyledButton';
import styles from '../Tabs.module.css';

jest.mock('../../Portal', () => ({
  ...(jest.requireActual('../../Portal') as any),
  Portal() {
    return null;
  },
}));

jest.mock('../../../utilities/breakpoints', () => ({
  ...(jest.requireActual('../../../utilities/breakpoints') as any),
  useBreakpoints: jest.fn(),
}));

describe('Tabs', () => {
  beforeEach(() => {
    mockUseBreakpoints(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const noop = () => {};
  const tabs: TabProps[] = [
    {
      content: 'All',
      id: 'all',
      onAction: noop,
    },
    {
      content: 'Unpaid',
      id: 'unpaid',
      onAction: noop,
      actions: [
        {
          type: 'rename',
          onAction: jest.fn(),
          onPrimaryAction: jest.fn(),
        },
      ],
    },
    {
      content: 'Paid',
      id: 'paid',
      onAction: noop,
      actions: [
        {
          type: 'rename',
          onAction: jest.fn(),
          onPrimaryAction: jest.fn(),
        },
        {
          type: 'duplicate',
          onAction: jest.fn(),
          onPrimaryAction: jest.fn(),
        },
      ],
    },
  ];
  const mockProps: TabsProps = {
    tabs,
    onSelect: jest.fn(),
    selected: 1,
    newViewAccessibilityLabel: 'create a new label',
    canCreateNewView: true,
  };

  describe('focus management', () => {
    it('passes focus index to tab measurer', () => {
      const tabToFocus = 1;
      const relatedTarget = document.createElement('div');
      const wrapper = mountWithApp(<Tabs {...mockProps} tabs={tabs} />);
      const ul = wrapper.find('ul')!;
      const target = ul.find('button', {id: tabs[tabToFocus].id})!.domNode!;
      ul.trigger('onFocus', {target, relatedTarget});
      expect(wrapper).toContainReactComponent(TabMeasurer, {tabToFocus});
    });

    it('does not change the focus index passed to tab measurer when the focus target is not a tab', () => {
      const tabToFocus = 1;
      const relatedTarget = document.createElement('div');
      const wrapper = mountWithApp(<Tabs {...mockProps} tabs={tabs} />);
      const ul = wrapper.find('ul')!;
      const target = ul.domNode!;
      ul.trigger('onFocus', {target, relatedTarget});
      expect(wrapper).toContainReactComponent(TabMeasurer, {tabToFocus});
    });

    it('does not change the focus index passed to tab measurer when the focus is coming in from somewhere other than another tab', () => {
      const tabToFocus = 1;
      const relatedTarget = null;
      const wrapper = mountWithApp(<Tabs {...mockProps} tabs={tabs} />);
      const ul = wrapper.find('ul')!;
      const target = ul.domNode!;
      ul.trigger('onFocus', {target, relatedTarget});
      expect(wrapper).toContainReactComponent(TabMeasurer, {tabToFocus});
    });

    it('forgets the focus position if we blur the target and it is not another tab', () => {
      const tabToFocus = -1;
      const relatedTarget = null;
      const wrapper = mountWithApp(<Tabs {...mockProps} tabs={tabs} />);
      wrapper.find('ul')!.trigger('onBlur', {relatedTarget});
      expect(wrapper).toContainReactComponent(TabMeasurer, {tabToFocus});
    });

    it('loses focus if we are going to anywhere other than another tab', () => {
      const tabToFocus = -1;
      const relatedTarget = document.createElement('div');
      const wrapper = mountWithApp(<Tabs {...mockProps} tabs={tabs} />);
      wrapper.find('ul')!.trigger('onBlur', {relatedTarget});
      expect(wrapper).toContainReactComponent(TabMeasurer, {tabToFocus});
    });
  });

  describe('tabs', () => {
    it('uses the IDs passed in for the tabs', () => {
      const tabs: TabsProps['tabs'] = [
        {content: 'Tab 1', id: 'tab-1'},
        {content: 'Tab 2', id: 'tab-2'},
      ];
      const wrapper = mountWithApp(<Tabs {...mockProps} tabs={tabs} />);

      tabs.forEach((tab) => {
        expect(wrapper.find('ul')!).toContainReactComponent(Tab, {
          id: tab.id,
        });
      });
    });

    it('uses the panelID passed in for the tabs', () => {
      const panelIDedTabs = [
        {...tabs[0], panelID: 'panel-1'},
        {...tabs[1], panelID: 'panel-2'},
      ];
      const content = <p>Panel contents</p>;
      const wrapper = mountWithApp(
        <Tabs {...mockProps} tabs={panelIDedTabs}>
          {content}
        </Tabs>,
      );

      panelIDedTabs.forEach((tab) => {
        expect(wrapper.find('ul')!).toContainReactComponent(Tab, {
          panelID: tab.panelID,
        });
      });
    });

    it('uses an auto-generated panelID if none is provided', () => {
      const content = <p>Panel contents</p>;
      const wrapper = mountWithApp(<Tabs {...mockProps}>{content}</Tabs>);

      tabs.forEach((_, index) => {
        const panelID = wrapper.find('ul')!.findAll(Tab)[index].prop('panelID');
        expect(typeof panelID).toBe('string');
        expect(panelID).not.toBe('');
      });
    });

    it('sets the panelID to undefined when the tab does not have an associated panel (child)', () => {
      const wrapper = mountWithApp(<Tabs {...mockProps} />);

      tabs.forEach((_, index) => {
        expect(wrapper.find('ul')!.findAll(Tab)[index]).toHaveReactProps({
          panelID: undefined,
        });
      });
    });

    it('sets the tab URL if passed in the tab descriptor', () => {
      const urlTabs = [
        {...tabs[0], url: 'https://shopify.com'},
        {...tabs[1], url: 'https://google.com'},
      ];
      const wrapper = mountWithApp(<Tabs {...mockProps} tabs={urlTabs} />);

      urlTabs.forEach((tab, index) => {
        expect(wrapper.find('ul')!.findAll(Tab)[index]).toHaveReactProps({
          url: tab.url,
        });
      });
    });

    it('sets the accessibility label for each of the tabs', () => {
      const labelledTabs = [
        {...tabs[0], accessibilityLabel: 'Tab 1'},
        {...tabs[1], accessibilityLabel: 'Tab 2'},
      ];
      const wrapper = mountWithApp(<Tabs {...mockProps} tabs={labelledTabs} />);

      labelledTabs.forEach((tab, index) => {
        expect(wrapper.find('ul')!.findAll(Tab)[index]).toHaveReactProps({
          accessibilityLabel: tab.accessibilityLabel,
        });
      });
    });

    it('sets the content for each of the tabs if given content', () => {
      const tabsWithContent = [
        {content: 'Tab 1', id: 'tab-1'},
        {content: 'Tab 2', id: 'tab-2'},
      ];
      const wrapper = mountWithApp(
        <Tabs {...mockProps} tabs={tabsWithContent} />,
      );

      tabsWithContent.forEach((tab, index) => {
        expect(wrapper.find('ul')!.findAll(Tab)[index]).toContainReactComponent(
          Text,
          {children: tab!.content},
        );
      });
    });

    it('sets the content correctly if given a Badge', () => {
      const tabsWithContent = [
        {content: 'Tab 1', badge: '1', id: 'tab-1'},
        {
          content: 'Tab 2',
          badge: '2',
          id: 'tab-2',
        },
      ];
      const wrapper = mountWithApp(
        <Tabs {...mockProps} tabs={tabsWithContent} />,
      );

      tabsWithContent.forEach((tab, index) => {
        expect(wrapper.find('ul')!.findAll(Tab)[index]).toContainReactComponent(
          Badge,
          {
            children: tab.badge,
          },
        );
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

      const wrapper = mountWithApp(
        <Tabs {...mockProps} tabs={panelIDedTabs}>
          Panel contents
        </Tabs>,
      );
      wrapper.setProps({selected: 0});
      expect(panelStub.focus).toHaveBeenCalled();
    });

    it('passes the selected prop to the Tab correctly', () => {
      const wrapper = mountWithApp(<Tabs {...mockProps} />);

      expect(wrapper!.find('ul')!.findAll(Tab)[1]!.prop('selected')).toBe(true);
    });
  });

  describe('panel', () => {
    it('renders a Panel for each of the Tabs', () => {
      const content = <p>Tab content</p>;
      const wrapper = mountWithApp(<Tabs {...mockProps}>{content}</Tabs>);
      expect(wrapper).toContainReactComponentTimes(Panel, 3);
    });

    it('renders a Panel with a hidden prop for the non selected tabs', () => {
      const content = <p>Tab content</p>;
      const wrapper = mountWithApp(<Tabs {...mockProps}>{content}</Tabs>);

      expect(wrapper.findAll(Panel)[0]).toHaveReactProps({hidden: true});
    });

    it('wraps the children in a Panel with matching aria attributes to the tab', () => {
      const content = <p>Tab content</p>;
      const wrapper = mountWithApp(<Tabs {...mockProps}>{content}</Tabs>);

      const selectedTab = wrapper.find('ul')!.findAll(Tab)[1];
      const panel = wrapper.findAll(Panel)[1];

      expect(panel).toContainReactComponent('p', {children: 'Tab content'});
      expect(panel).toHaveReactProps({id: selectedTab.prop('panelID')});
    });

    it('uses a custom panelID', () => {
      const panelIDedTabs = [
        {...tabs[0], panelID: 'my-custom-panel-id'},
        tabs[1],
      ];
      const content = <p>Tab content</p>;
      const wrapper = mountWithApp(
        <Tabs {...mockProps} tabs={panelIDedTabs}>
          {content}
        </Tabs>,
      );

      const panel = wrapper.findAll(Panel)[1];
      const selectedTab = wrapper.find('ul')!.findAll(Tab)[1];
      expect(panel).toHaveReactProps({id: selectedTab.prop('panelID')});
    });
  });

  describe('onSelect()', () => {
    it('is called with the index of the clicked tab', () => {
      const spy = jest.fn();
      const wrapper = mountWithApp(<Tabs {...mockProps} onSelect={spy} />);
      wrapper.find('ul')!.findAll(Tab)[2].find('button')!.trigger('onClick');
      expect(spy).toHaveBeenCalledWith(2);
    });
  });

  describe('<TabMeasurer />', () => {
    const mockTabs = [
      {content: 'Tab 1', id: 'tab-1'},
      {content: 'Tab 2', id: 'tab-2'},
      {content: 'Tab 3', id: 'tab-3'},
    ];

    it('is not set to anything by default', () => {
      const tabs = mountWithApp(<Tabs {...mockProps} tabs={mockTabs} />);
      expect(tabs.find(TabMeasurer)).toHaveReactProps({tabToFocus: -1});
    });

    it('passes the provided selected value if given', () => {
      const tabs = mountWithApp(
        <Tabs {...mockProps} selected={1} tabs={mockTabs} />,
      );
      expect(tabs.find(TabMeasurer)).toHaveReactProps({selected: 1});
    });

    describe('ArrowRight', () => {
      it('shifts focus to the next tab when pressing ArrowRight', () => {
        const tabs = mountWithApp(
          <Tabs {...mockProps} tabs={mockTabs} selected={0} />,
        );
        tabs.find('ul')!.trigger('onKeyUp', {
          key: 'ArrowRight',
        });
        tabs.setProps({selected: 1});
        expect(tabs.find(TabMeasurer)).toHaveReactProps({tabToFocus: 1});
      });

      it('shifts focus to the first tab when pressing ArrowRight on the last tab', () => {
        const tabs = mountWithApp(
          <Tabs {...mockProps} tabs={mockTabs} selected={0} />,
        );
        tabs.find('ul')!.trigger('onKeyUp', {
          key: 'ArrowRight',
        });
        tabs.setProps({selected: 1});
        tabs.find('ul')!.trigger('onKeyUp', {
          key: 'ArrowRight',
        });
        tabs.setProps({selected: 2});
        tabs.find('ul')!.trigger('onKeyUp', {
          key: 'ArrowRight',
        });
        tabs.setProps({selected: 0});
        expect(tabs.find(TabMeasurer)).toHaveReactProps({tabToFocus: 0});
      });
    });

    describe('ArrowLeft', () => {
      it('shifts focus to the last tab when pressing ArrowLeft', () => {
        const tabs = mountWithApp(
          <Tabs {...mockProps} tabs={mockTabs} selected={0} />,
        );
        tabs.find('ul')?.trigger('onFocus', {
          target: {
            closest: jest.fn(),
            classList: {
              contains: jest.fn(),
            },
          },
        });
        tabs.find('ul')!.trigger('onKeyUp', {
          key: 'ArrowLeft',
        });
        tabs.setProps({selected: 2});
        expect(tabs.find(TabMeasurer)).toHaveReactProps({tabToFocus: 2});
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
    const mockTabs = [
      {content: 'Tab 1', id: 'tab-1'},
      {content: 'Tab 2', id: 'tab-2'},
      {content: 'Tab 3', id: 'tab-3'},
    ];

    it('renders disclosureText when provided', () => {
      const disclosureText = 'More views';
      const wrapper = mountWithApp(
        <Tabs {...mockProps} tabs={mockTabs} disclosureText={disclosureText} />,
      );

      expect(wrapper).toContainReactText(disclosureText);
    });

    it('passes preferredPosition below to the Popover', () => {
      const tabs = mountWithApp(<Tabs {...mockProps} tabs={mockTabs} />);
      tabs.find(TabMeasurer)!.trigger('handleMeasurement', {
        hiddenTabWidths: [82, 160, 150, 100, 80, 120],
        containerWidth: 300,
        disclosureWidth: 0,
      });

      expect(tabs.find(Popover)).toHaveReactProps({preferredPosition: 'below'});
    });

    it('renders with an UnstyledButton as the activator when there are hiddenTabs', () => {
      const tabs = mountWithApp(<Tabs {...mockProps} tabs={mockTabs} />);
      tabs.find(TabMeasurer)!.trigger('handleMeasurement', {
        hiddenTabWidths: [82, 160, 150, 100, 80, 120],
        containerWidth: 300,
        disclosureWidth: 0,
      });

      expect(tabs.find(Popover)!.prop('activator').type).toBe(UnstyledButton);
    });

    describe('ArrowRight', () => {
      it('shifts focus to the first tab when pressing ArrowRight', () => {
        const tabs = mountWithApp(<Tabs {...mockProps} tabs={mockTabs} />);
        tabs.find(TabMeasurer)!.trigger('handleMeasurement', {
          hiddenTabWidths: [82, 160, 150, 100, 80, 120],
          containerWidth: 300,
          disclosureWidth: 0,
        });

        tabs.find(Popover)!.find('button')!.trigger('onClick');

        tabs.find('ul')!.trigger('onKeyUp', {
          key: 'ArrowRight',
        });

        expect(tabs).toContainReactComponent(TabMeasurer, {tabToFocus: 0});
      });

      it('shifts focus to the first hidden tab when the last visible tab is focused and the disclosure popover is active', () => {
        const tabs = mountWithApp(
          <Tabs {...mockProps} tabs={mockTabs} selected={0} />,
        );

        tabs.find(TabMeasurer)!.trigger('handleMeasurement', {
          hiddenTabWidths: [82, 160, 150, 100, 80, 120],
          containerWidth: 300,
          disclosureWidth: 0,
        });

        const allPopovers = tabs.findAll(Popover)!;
        const popover = allPopovers[allPopovers.length - 1]!;
        const disclosureActivator = popover.find('button')!;

        disclosureActivator.trigger('onClick');

        tabs.find('ul')!.trigger('onKeyUp', {
          key: 'ArrowRight',
        });

        expect(tabs.find(TabMeasurer)!.prop('tabToFocus')).toBe(0);

        tabs.find('ul')!.trigger('onKeyUp', {
          key: 'ArrowRight',
        });

        expect(tabs.find(TabMeasurer)!.prop('tabToFocus')).toBe(1);

        tabs.find('ul')!.trigger('onKeyUp', {
          key: 'ArrowRight',
        });

        expect(tabs.find(TabMeasurer)!.prop('tabToFocus')).toBe(2);

        tabs.find('ul')!.trigger('onKeyUp', {
          key: 'ArrowRight',
        });

        expect(tabs.find(TabMeasurer)!.prop('tabToFocus')).toBe(0);
      });

      it('does not shift focus to the first hidden tab when the last visible tab is focused and the disclosure popover is not active', () => {
        const tabs = mountWithApp(<Tabs {...mockProps} tabs={mockTabs} />);

        tabs.find(TabMeasurer)!.trigger('handleMeasurement', {
          hiddenTabWidths: [82, 160, 150, 100, 80, 120],
          containerWidth: 300,
          disclosureWidth: 0,
        });

        expect(tabs).toContainReactComponent(Popover, {
          active: false,
        });

        tabs.find('ul')!.trigger('onKeyUp', {
          key: 'ArrowRight',
        });

        expect(tabs).toContainReactComponent(TabMeasurer, {
          tabToFocus: 1,
        });

        tabs.find('ul')!.trigger('onKeyUp', {
          key: 'Enter',
        });

        expect(tabs).toContainReactComponent(TabMeasurer, {
          tabToFocus: 1,
        });
      });
    });
  });

  describe('canCreateNewView', () => {
    it('does not render the new tab Tab if canCreateNewView=false', () => {
      const wrapper = mountWithApp(
        <Tabs {...mockProps} canCreateNewView={false} />,
      );

      expect(wrapper).not.toContainReactComponent(Tab, {
        content: mockProps.newViewAccessibilityLabel,
      });
    });

    it('renders the new tab Tab if canCreateNewView=true', () => {
      const wrapper = mountWithApp(<Tabs {...mockProps} canCreateNewView />);

      expect(wrapper).toContainReactComponent(Tab, {
        content: mockProps.newViewAccessibilityLabel,
      });
      expect(wrapper).toContainReactComponent(Icon, {
        accessibilityLabel: mockProps.newViewAccessibilityLabel,
      });
    });

    it('onCreateNewView gets called correctly', () => {
      const onCreateNewView = jest.fn();
      const wrapper = mountWithApp(
        <Tabs
          {...mockProps}
          canCreateNewView
          onCreateNewView={onCreateNewView}
        />,
      );
      wrapper.act(() => {
        wrapper
          .find(Tab, {
            content: mockProps.newViewAccessibilityLabel,
          })
          ?.trigger('onAction');
      });

      expect(wrapper).toContainReactComponent(CreateViewModal, {
        open: true,
      });

      wrapper.act(() => {
        wrapper.find(CreateViewModal)!.trigger('onClickPrimaryAction', 'foo');
      });

      expect(onCreateNewView).toHaveBeenCalledWith('foo');
    });
  });

  describe('small screen tabs', () => {
    it('will not display the disclosure tab', () => {
      mockUseBreakpoints(true);
      const wrapper = mountWithApp(<Tabs {...mockProps} />);

      expect(wrapper).not.toContainReactComponent('div', {
        className: styles.DisclosureActivator,
      });
    });
  });
});

function mockUseBreakpoints(mdDown: boolean) {
  const useBreakpoints: jest.Mock = jest.requireMock(
    '../../../utilities/breakpoints',
  ).useBreakpoints;

  useBreakpoints.mockReturnValue({
    mdDown,
  });
}
