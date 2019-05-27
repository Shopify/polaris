import React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import List from '../List';
import Item from '../../Item';

describe('<List />', () => {
  const mockProps = {
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
      expect(
        list
          .find('button')
          .first()
          .prop('id'),
      ).toBe('repeat-customers');
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
});
