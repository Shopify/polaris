import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {List} from '../List';
import {Item} from '../../Item';

describe('<List />', () => {
  const mockProps = {
    focusIndex: -1,
    disclosureTabs: [
      {
        id: 'repeat-customers',
        content: 'Repeat customers',
      },
      {
        id: 'prospects',
        content: 'Prospects',
      },
    ],
  };

  it('renders an unordered list', () => {
    const list = mountWithAppProvider(<List {...mockProps} />);
    expect(list.find('ul')).toHaveLength(1);
  });

  describe('focusIndex', () => {
    it('does not pass focusIndex to last Item', () => {
      const focusIndex = 1;
      const list = mountWithAppProvider(
        <List {...mockProps} focusIndex={focusIndex} />,
      );
      const items = list.find(Item);
      expect(items.first().prop('focused')).toBe(false);
    });

    it('passes focusIndex to first Item', () => {
      const focusIndex = 1;
      const list = mountWithAppProvider(
        <List {...mockProps} focusIndex={focusIndex} />,
      );
      const items = list.find(Item);
      expect(items.last().prop('focused')).toBe(true);
    });
  });

  describe('disclosureTabs', () => {
    const disclosureTabs = [
      {
        id: 'repeat-customers',
        content: 'Repeat customers',
      },
      {
        id: 'prospects',
        content: 'Prospects',
      },
    ];

    it('renders a button for each item in disclosureTabs', () => {
      const list = mountWithAppProvider(
        <List {...mockProps} disclosureTabs={disclosureTabs} />,
      );
      expect(list.find('button')).toHaveLength(2);
    });

    it('passes the id to the button', () => {
      const list = mountWithAppProvider(
        <List {...mockProps} disclosureTabs={disclosureTabs} />,
      );
      expect(list.find('button').first().prop('id')).toBe('repeat-customers');
    });
  });

  describe('<Item />', () => {
    const disclosureTabs = [
      {
        id: 'repeat-customers',
        content: 'Repeat customers',
      },
      {
        id: 'prospects',
        content: 'Prospects',
      },
    ];

    it('renders an Item for each item in disclosureTabs', () => {
      const list = mountWithAppProvider(
        <List {...mockProps} disclosureTabs={disclosureTabs} />,
      );
      expect(list.find(Item)).toHaveLength(2);
    });

    it('renders the provided content', () => {
      const list = mountWithAppProvider(
        <List {...mockProps} disclosureTabs={disclosureTabs} />,
      );
      const firstItem = list.find(Item).first();
      expect(firstItem.contains('Repeat customers')).toBe(true);
    });
  });

  describe('newDesignLanguage', () => {
    it('adds a newDesignLanguage class when newDesignLanguage is enabled', () => {
      const list = mountWithApp(<List {...mockProps} />, {
        features: {newDesignLanguage: true},
      });
      expect(list).toContainReactComponent('ul', {
        className: 'List newDesignLanguage',
      });
    });

    it('does not add a newDesignLanguage class when newDesignLanguage is not enabled', () => {
      const list = mountWithApp(<List {...mockProps} />, {
        features: {newDesignLanguage: false},
      });
      expect(list).toContainReactComponent('ul', {
        className: 'List',
      });
    });
  });
});
