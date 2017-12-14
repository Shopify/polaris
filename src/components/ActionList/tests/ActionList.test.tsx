import * as React from 'react';
import {mount} from 'enzyme';
import ActionList from '../ActionList';

describe('<ActionList />', () => {
  let mockOnActionAnyItem: jest.Mock;

  beforeEach(() => {
    mockOnActionAnyItem = jest.fn();
  });

  it('fires onActionAnyItem on click or keypress of a button item', () => {
    const actionList = mount(
      <ActionList
        items={[{content: 'Add discount'}]}
        onActionAnyItem={mockOnActionAnyItem}
      />,
    );
    actionList.find('button').simulate('click');
    expect(mockOnActionAnyItem).toHaveBeenCalledTimes(1);
  });

  it('fires onActionAnyItem on click or keypress of an anchor item', () => {
    const actionList = mount(
      <ActionList
        items={[{content: 'Share on Facebook', url: 'https://facebook.com', external: true}]}
        onActionAnyItem={mockOnActionAnyItem}
      />,
    );
    actionList.find('a').simulate('click');
    expect(mockOnActionAnyItem).toHaveBeenCalledTimes(1);
  });

  it('fires onActionAnyItem and Item.onAction on click or keypress of an item', () => {
    const mockOnAction = jest.fn();
    const actionList = mount(
      <ActionList
        items={[{content: 'Add discount', onAction: mockOnAction}]}
        onActionAnyItem={mockOnActionAnyItem}
      />,
    );
    actionList.find('button').simulate('click');
    expect(mockOnActionAnyItem).toHaveBeenCalledTimes(1);
    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });
});
