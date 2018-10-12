import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import ActionList from '../ActionList';
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

  it('it passes actionRole to Section', () => {
    const actionList = mountWithAppProvider(
      <ActionList
        items={[{content: 'Add discount'}]}
        onActionAnyItem={mockOnActionAnyItem}
        actionRole="option"
      />,
    );
    expect(actionList.find(Section).prop('actionRole')).toBe('option');
  });
});
