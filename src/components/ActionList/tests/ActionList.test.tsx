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
    expect(mockOnActionAnyItem.mock.calls.length).toBe(1);
    actionList.unmount();
  });

  it('fires onActionAnyItem on click or keypress of an anchor item', () => {
    const actionList = mount(
      <ActionList
        items={[{content: 'Share on Facebook', url: 'https://facebook.com', external: true}]}
        onActionAnyItem={mockOnActionAnyItem}
      />,
    );
    actionList.find('a').simulate('click');
    expect(mockOnActionAnyItem.mock.calls.length).toBe(1);
    actionList.unmount();
  });
});
