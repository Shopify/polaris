import React from 'react';
import {ImportMinor, ExportMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {ActionList} from '../ActionList';
import {Badge} from '../../Badge';
import {Item, Section} from '../components';

describe('<ActionList />', () => {
  let mockOnActionAnyItem: jest.Mock;

  beforeEach(() => {
    mockOnActionAnyItem = jest.fn();
  });

  it('fires onActionAnyItem on click or keypress of a button item', () => {
    const actionList = mountWithAppProvider(
      <ActionList
        items={[{content: 'Add discount'}]}
        onActionAnyItem={mockOnActionAnyItem}
      />,
    );
    actionList.find('button').simulate('click');
    expect(mockOnActionAnyItem).toHaveBeenCalledTimes(1);
  });

  it('fires onActionAnyItem on click or keypress of an anchor item', () => {
    const actionList = mountWithAppProvider(
      <ActionList
        items={[
          {
            content: 'Share on Facebook',
            url: 'https://facebook.com',
            external: true,
          },
        ]}
        onActionAnyItem={mockOnActionAnyItem}
      />,
    );
    actionList.find('a').simulate('click');
    expect(mockOnActionAnyItem).toHaveBeenCalledTimes(1);
  });

  it('fires onActionAnyItem and Item.onAction on click or keypress of an item', () => {
    const mockOnAction = jest.fn();
    const actionList = mountWithAppProvider(
      <ActionList
        items={[{content: 'Add discount', onAction: mockOnAction}]}
        onActionAnyItem={mockOnActionAnyItem}
      />,
    );
    actionList.find('button').simulate('click');
    expect(mockOnActionAnyItem).toHaveBeenCalledTimes(1);
    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });

  it('generates a unique key for each item from the content and index', () => {
    const items = [
      {
        content: 'Add Discount',
      },
      {
        content: 'Share on Facebook',
      },
    ];

    const actionList = mountWithAppProvider(<ActionList items={items} />);
    actionList.find(Item).forEach((item, index) => {
      const expectedKey = `${items[index].content}-${index}`;
      expect(item.key()).toBe(expectedKey);
    });
  });

  it('passes actionRole to Section', () => {
    const actionList = mountWithAppProvider(
      <ActionList
        items={[{content: 'Add discount'}]}
        onActionAnyItem={mockOnActionAnyItem}
        actionRole="option"
      />,
    );
    expect(actionList.find(Section).prop('actionRole')).toBe('option');
  });

  it('renders a ul with sections', () => {
    const actionList = mountWithAppProvider(
      <ActionList
        sections={[
          {
            title: 'File options',
            items: [
              {content: 'Import file', icon: ImportMinor},
              {content: 'Export file', icon: ExportMinor},
            ],
          },
        ]}
      />,
    );

    expect(actionList.find('ul')).toHaveLength(1);
  });

  it('renders a div without sections', () => {
    const actionList = mountWithAppProvider(<ActionList />);

    expect(actionList.find('div')).toHaveLength(1);
  });

  it('renders a section with a title', () => {
    const actionList = mountWithAppProvider(
      <ActionList
        sections={[
          {
            title: 'File options',
            items: [
              {content: 'Import file', icon: ImportMinor},
              {content: 'Export file', icon: ExportMinor},
            ],
          },
        ]}
      />,
    );

    expect(actionList.find(Section).text()).toContain('File option');
  });

  it('renders an item with a badge', () => {
    const actionList = mountWithAppProvider(
      <ActionList
        items={[
          {content: 'Add discount', badge: {status: 'new', content: 'badge'}},
        ]}
        onActionAnyItem={mockOnActionAnyItem}
        actionRole="option"
      />,
    );
    expect(actionList.find(Badge).props()).toStrictEqual({
      children: 'badge',
      status: 'new',
    });
  });
});
