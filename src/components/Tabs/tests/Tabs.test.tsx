import * as React from 'react';
import {mount} from 'enzyme';

import Tabs, {Props} from '..';
import Tab from '../Tab';
import Panel from '../Panel';

describe('<Tabs />', () => {
  let tabs: Props['tabs'];

  beforeEach(() => {
    tabs = [{content: 'Tab 1', id: 'tab-1'}, {content: 'Tab 2', id: 'tab-2'}];
  });

  describe('tabs', () => {
    it('uses the IDs passed in for the tabs', () => {
      const wrapper = mount(<Tabs selected={0} tabs={tabs} />);

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
      const wrapper = mount(<Tabs selected={0} tabs={panelIDedTabs} />);

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
      const wrapper = mount(<Tabs selected={0} tabs={tabs} />);

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
      const wrapper = mount(<Tabs selected={0} tabs={urlTabs} />);

      urlTabs.forEach((tab, index) => {
        expect(
          wrapper
            .find(Tab)
            .at(index)
            .prop('url'),
        ).toEqual(tab.url);
      });
    });

    it('sets the accessibility label for each of the tabs', () => {
      const labelledTabs = [
        {...tabs[0], accessibilityLabel: 'Tab 1'},
        {...tabs[1], accessibilityLabel: 'Tab 2'},
      ];
      const wrapper = mount(<Tabs selected={0} tabs={labelledTabs} />);

      labelledTabs.forEach((tab, index) => {
        expect(
          wrapper
            .find(Tab)
            .at(index)
            .prop('accessibilityLabel'),
        ).toEqual(tab.accessibilityLabel);
      });
    });

    it('sets the content for each of the tabs if given a title', () => {
      const titledTabs = [
        {title: 'Tab 1', id: 'tab-1'},
        {title: 'Tab 2', id: 'tab-2'},
      ];
      const wrapper = mount(<Tabs selected={0} tabs={titledTabs} />);

      titledTabs.forEach((tab, index) => {
        expect(
          wrapper
            .find(Tab)
            .at(index)
            .prop('children'),
        ).toEqual(tab.title);
      });
    });
  });

  describe('selected', () => {
    let panelStub: {focus: jest.Mock<any>};
    let originalGetElementByID: (typeof document)['getElementById'];

    beforeEach(() => {
      originalGetElementByID = document.getElementById;
      panelStub = {focus: jest.fn()};
      document.getElementById = jest.fn(() => panelStub);
    });

    afterEach(() => {
      document.getElementById = originalGetElementByID;
    });

    it('focuses the panel when a tab becomes selected', () => {
      const panelIDedTabs = [
        {...tabs[0], panelID: 'panel-1'},
        {...tabs[1], panelID: 'panel-2'},
      ];

      const wrapper = mount(
        <Tabs selected={0} tabs={panelIDedTabs}>
          Panel contents
        </Tabs>,
      );
      wrapper.setProps({selected: 1});
      expect(panelStub.focus).toHaveBeenCalled();
    });
  });

  describe('children', () => {
    it('wraps the children in a panel with matching aria attributes to the tab', () => {
      const content = <p>Tab content</p>;
      const wrapper = mount(
        <Tabs selected={0} tabs={tabs}>
          {content}
        </Tabs>,
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
      const wrapper = mount(
        <Tabs selected={0} tabs={panelIDedTabs}>
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
      const wrapper = mount(<Tabs selected={0} tabs={tabs} onSelect={spy} />);
      wrapper
        .find(Tab)
        .at(1)
        .find('button')
        .simulate('click');
      expect(spy).toHaveBeenCalledWith(1);
    });
  });
});
