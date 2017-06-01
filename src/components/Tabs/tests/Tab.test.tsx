import * as React from 'react';
import {shallow, mount, ShallowWrapper} from 'enzyme';
import Tab from '../Tab';

describe('<Tab />', () => {
  it('has the correct role', () => {
    const tab = shallow(<Tab id="my-tab">Tab</Tab>);
    expect(tab.find('button').prop('role')).toBe('tab');
  });

  describe('id', () => {
    it('uses the ID for the underlying actionable item', () => {
      const tab = shallow(<Tab id="my-tab">Tab</Tab>);
      expect(tab.find('button').prop('id')).toBe('my-tab');
    });
  });

  describe('selected', () => {
    it('is aria-selected when the tab is selected', () => {
      const tab = shallow(<Tab id="my-tab" selected>Tab</Tab>);
      expect((tab.find('button') as ShallowWrapper<any, any>).prop('aria-selected')).toBe(true);
    });

    it('is not aria-selected when the tab is not selected', () => {
      let tab = shallow(<Tab id="my-tab">Tab</Tab>);
      expect((tab.find('button') as ShallowWrapper<any, any>).prop('aria-selected')).toBeFalsy();

      tab = shallow(<Tab id="my-tab" selected={false}>Tab</Tab>);
      expect((tab.find('button') as ShallowWrapper<any, any>).prop('aria-selected')).toBeFalsy();
    });
  });

  describe('panelID', () => {
    it('uses the panelID as the controlled element’s ID', () => {
      const tab = shallow(<Tab id="my-tab" panelID="my-panel">Tab</Tab>);
      expect((tab.find('button') as ShallowWrapper<any, any>).prop('aria-controls')).toBe('my-panel');
    });
  });

  describe('url', () => {
    it('uses an anchor tag when a URL is passed', () => {
      const tab = mount(<Tab url="https://shopify.com" id="my-tab">Tab</Tab>);
      const anchor = tab.find('a');
      expect(anchor.exists()).toBe(true);
      expect(anchor.prop('href')).toEqual('https://shopify.com');
    });
  });

  describe('onClick()', () => {
    it('is called when the underlying button is clicked', () => {
      const spy = jest.fn();
      const tab = shallow(<Tab id="my-tab" onClick={spy}>Tab</Tab>);
      tab.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
});
