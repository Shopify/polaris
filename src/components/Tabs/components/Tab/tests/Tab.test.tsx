import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {FeaturesContext} from '../../../../../utilities/features';
import {Tab} from '../Tab';

describe('<Tab />', () => {
  const tab = <Tab id="my-tab">Tab</Tab>;

  const tabsWithoutDesignLanguage = mountWithAppProvider(tab);
  const tabsWithDesignLanguage = mountWithAppProvider(
    <FeaturesContext.Provider value={{newDesignLanguage: true}}>
      {tab}
    </FeaturesContext.Provider>,
  );

  it('newDesignLanguage class is present on li element', () => {
    expect(tabsWithDesignLanguage.find('li')).toHaveLength(1);

    expect(
      tabsWithoutDesignLanguage.find('li').prop('className'),
    ).not.toContain('newDesignLanguage');

    expect(tabsWithDesignLanguage.find('li').prop('className')).toContain(
      'newDesignLanguage',
    );
  });

  it('newDesignLanguage class is present on title element', () => {
    expect(tabsWithDesignLanguage.find('span')).toHaveLength(1);

    expect(
      tabsWithoutDesignLanguage.find('span').prop('className'),
    ).not.toContain('newDesignLanguage');

    expect(tabsWithDesignLanguage.find('span').prop('className')).toContain(
      'newDesignLanguage',
    );
  });

  it('has the tab role', () => {
    const tab = mountWithAppProvider(<Tab id="my-tab">Tab</Tab>);
    expect(tab.find('button').prop('role')).toBe('tab');
  });

  describe('id', () => {
    it('uses the ID for the underlying actionable item', () => {
      const tab = mountWithAppProvider(<Tab id="my-tab">Tab</Tab>);
      expect(tab.find('button').prop('id')).toBe('my-tab');
    });
  });

  describe('selected', () => {
    it('is aria-selected when the tab is selected', () => {
      const tab = mountWithAppProvider(
        <Tab id="my-tab" selected>
          Tab
        </Tab>,
      );
      expect(tab.find('button').prop('aria-selected')).toBe(true);
    });

    it('is not aria-selected when the tab is not selected', () => {
      let tab = mountWithAppProvider(<Tab id="my-tab">Tab</Tab>);
      expect(tab.find('button').prop('aria-selected')).toBeFalsy();

      tab = mountWithAppProvider(
        <Tab id="my-tab" selected={false}>
          Tab
        </Tab>,
      );
      expect(tab.find('button').prop('aria-selected')).toBeFalsy();
    });
  });

  describe('panelID', () => {
    it('uses the panelID as the controlled element’s ID', () => {
      const tab = mountWithAppProvider(
        <Tab id="my-tab" panelID="my-panel">
          Tab
        </Tab>,
      );
      expect(tab.find('button').prop('aria-controls')).toBe('my-panel');
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
