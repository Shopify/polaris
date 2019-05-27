import React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Tab from '../Tab';

describe('<Tab />', () => {
  describe('id', () => {
    it('uses the ID for the underlying actionable item', () => {
      const tab = mountWithAppProvider(<Tab id="my-tab">Tab</Tab>);
      expect(tab.find('button').prop('id')).toBe('my-tab');
    });
  });

  describe('url', () => {
    it('uses an anchor tag when a URL is passed', () => {
      const tab = mountWithAppProvider(
        <Tab url="https://shopify.com" id="my-tab">
          Tab
        </Tab>,
      );
      const anchor = tab.find('a');
      expect(anchor.exists()).toBe(true);
      expect(anchor.prop('href')).toStrictEqual('https://shopify.com');
    });
  });

  describe('onClick()', () => {
    it('is called when the underlying button is clicked', () => {
      const spy = jest.fn();
      const tab = mountWithAppProvider(
        <Tab id="my-tab" onClick={spy}>
          Tab
        </Tab>,
      );
      tab.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('accessibilityLabel()', () => {
    it('uses the label for aria-label', () => {
      const label = 'Tab contents';

      const button = mountWithAppProvider(
        <Tab id="my-tab" accessibilityLabel={label}>
          Tab
        </Tab>,
      ).find('button');
      expect(button.prop<string>('aria-label')).toBe(label);

      const anchor = mountWithAppProvider(
        <Tab id="my-tab" url="https://shopify.com" accessibilityLabel={label}>
          Tab
        </Tab>,
      ).find('a');
      expect(anchor.prop<string>('aria-label')).toBe(label);
    });
  });
});
