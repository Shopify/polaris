import React from 'react';
import {ImportIcon, ExportIcon} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {ActionList} from '../ActionList';
import {Badge} from '../../Badge';
import {Item, Section} from '../components';
import {Key} from '../../../types';
import {KeypressListener} from '../../KeypressListener';
import {TextField} from '../../TextField';

describe('<ActionList />', () => {
  let mockOnActionAnyItem: jest.Mock;

  beforeEach(() => {
    mockOnActionAnyItem = jest.fn();
  });

  it('fires onActionAnyItem on click or keypress of a button item', () => {
    const actionList = mountWithApp(
      <ActionList
        items={[{content: 'Add discount'}]}
        onActionAnyItem={mockOnActionAnyItem}
      />,
    );
    actionList.find('button')!.trigger('onClick');
    expect(mockOnActionAnyItem).toHaveBeenCalledTimes(1);
  });

  it('fires onActionAnyItem on click or keypress of an anchor item', () => {
    const actionList = mountWithApp(
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
    actionList.find('a')!.trigger('onClick');
    expect(mockOnActionAnyItem).toHaveBeenCalledTimes(1);
  });

  it('fires onActionAnyItem and Item.onAction on click or keypress of an item', () => {
    const mockOnAction = jest.fn();
    const actionList = mountWithApp(
      <ActionList
        items={[{content: 'Add discount', onAction: mockOnAction}]}
        onActionAnyItem={mockOnActionAnyItem}
      />,
    );
    actionList.find('button')!.trigger('onClick');
    expect(mockOnActionAnyItem).toHaveBeenCalledTimes(1);
    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });

  it('generates an Item for each item', () => {
    const items = [
      {
        content: 'Add Discount',
      },
      {
        content: 'Share on Facebook',
      },
    ];

    const actionList = mountWithApp(<ActionList items={items} />);
    actionList.findAll(Item).forEach((item, index) => {
      expect(item).toHaveReactProps({
        content: `${items[index].content}`,
      });
    });
  });

  it('passes actionRole to Section', () => {
    const actionList = mountWithApp(
      <ActionList
        items={[{content: 'Add discount'}]}
        onActionAnyItem={mockOnActionAnyItem}
        actionRole="option"
      />,
    );
    expect(actionList).toContainReactComponent(Section, {
      actionRole: 'option',
    });
  });

  it('renders a ul with sections', () => {
    const actionList = mountWithApp(
      <ActionList
        sections={[
          {
            title: 'File options',
            items: [
              {content: 'Import file', icon: ImportIcon},
              {content: 'Export file', icon: ExportIcon},
            ],
          },
        ]}
      />,
    );

    expect(actionList).toContainReactComponentTimes('ul', 1);
  });

  it('renders a div without sections', () => {
    const actionList = mountWithApp(<ActionList />);

    expect(actionList).toContainReactComponentTimes('div', 1);
  });

  it('renders a section with a title', () => {
    const actionList = mountWithApp(
      <ActionList
        sections={[
          {
            title: 'File options',
            items: [
              {content: 'Import file', icon: ImportIcon},
              {content: 'Export file', icon: ExportIcon},
            ],
          },
        ]}
      />,
    );

    expect(actionList.find(Section)).toContainReactText('File option');
  });

  it('renders an item with a badge', () => {
    const actionList = mountWithApp(
      <ActionList
        items={[
          {content: 'Add discount', badge: {tone: 'new', content: 'badge'}},
        ]}
        onActionAnyItem={mockOnActionAnyItem}
        actionRole="option"
      />,
    );
    expect(actionList).toContainReactComponent(Badge, {
      children: 'badge',
      tone: 'new',
    });
  });

  it('wraps focus to first item in action list after keydown event on last element', () => {
    const actionList = mountWithApp(
      <ActionList
        sections={[
          {
            title: 'One',
            items: [
              {content: 'First section'},
              {content: 'First section second item'},
            ],
          },
          {
            title: 'Two',
            items: [
              {content: 'Second section'},
              {content: 'Second section second item'},
            ],
          },
        ]}
        onActionAnyItem={mockOnActionAnyItem}
        actionRole="menuitem"
      />,
    );

    const actionListButtons = actionList.findAll('button');
    const keypressListener = actionList.find(KeypressListener, {
      keyCode: Key.DownArrow,
    });

    const event = new KeyboardEvent('keydown', {
      keyCode: Key.DownArrow,
    });

    Object.defineProperty(event, 'target', {
      writable: false,
      // set target to last focusable item in list
      value: actionListButtons[actionListButtons.length - 1].domNode,
    });

    keypressListener?.trigger('handler', event);

    // expect focus to wrap back to first item in action list
    expect(document.activeElement).toStrictEqual(actionListButtons[0].domNode);
  });

  it('wraps focus to last item in action list after keyup event on first element', () => {
    const actionList = mountWithApp(
      <ActionList
        sections={[
          {
            title: 'One',
            items: [
              {content: 'First section'},
              {content: 'First section second item'},
            ],
          },
          {
            title: 'Two',
            items: [
              {content: 'Second section'},
              {content: 'Second section second item'},
            ],
          },
        ]}
        onActionAnyItem={mockOnActionAnyItem}
        actionRole="menuitem"
      />,
    );

    const actionListButtons = actionList.findAll('button');
    const keypressListener = actionList.find(KeypressListener, {
      keyCode: Key.UpArrow,
    });

    const event = new KeyboardEvent('keydown', {
      keyCode: Key.UpArrow,
    });

    Object.defineProperty(event, 'target', {
      writable: false,
      // set target to first focusable item in list
      value: actionListButtons[0].domNode,
    });

    keypressListener?.trigger('handler', event);

    // expect focus to wrap to last item in action list
    expect(document.activeElement).toStrictEqual(
      actionListButtons[actionListButtons.length - 1].domNode,
    );
  });

  it('does not render search with 7 or less items', () => {
    const actionList = mountWithApp(
      <ActionList
        allowFiltering
        items={[
          {content: 'Item 1'},
          {content: 'Item 2'},
          {content: 'Item 3'},
          {content: 'Item 4'},
          {content: 'Item 5'},
          {content: 'Item 6'},
          {content: 'Item 7'},
        ]}
      />,
    );

    expect(actionList).not.toContainReactComponentTimes(TextField, 1);
  });

  it('renders search with 8 or more items', () => {
    const actionList = mountWithApp(
      <ActionList
        allowFiltering
        items={[
          {content: 'Item 1'},
          {content: 'Item 2'},
          {content: 'Item 3'},
          {content: 'Item 4'},
          {content: 'Item 5'},
          {content: 'Item 6'},
          {content: 'Item 7'},
          {content: 'Item 8'},
          {content: 'Item 9'},
          {content: 'Item 10'},
        ]}
      />,
    );

    expect(actionList).toContainReactComponentTimes(TextField, 1);
  });

  it('does not renders search with 8 and no allowFiltering', () => {
    const actionList = mountWithApp(
      <ActionList
        items={[
          {content: 'Item 1'},
          {content: 'Item 2'},
          {content: 'Item 4'},
          {content: 'Item 5'},
          {content: 'Item 6'},
          {content: 'Item 7'},
          {content: 'Item 8'},
          {content: 'Item 9'},
          {content: 'Item 10'},
        ]}
      />,
    );

    expect(actionList).not.toContainReactComponentTimes(TextField, 1);
  });

  it('renders search with 8 or more items or section items', () => {
    const actionList = mountWithApp(
      <ActionList
        items={[{content: 'Item 1'}, {content: 'Item 2'}]}
        allowFiltering
        sections={[
          {
            title: '',
            items: [{content: 'Item 3'}, {content: 'Item 4'}],
          },
          {
            title: '',
            items: [
              {content: 'Item 4'},
              {content: 'Item 5'},
              {content: 'Item 6'},
              {content: 'Item 7'},
              {content: 'Item 8'},
              {content: 'Item 9'},
              {content: 'Item 10'},
            ],
          },
        ]}
      />,
    );

    expect(actionList).toContainReactComponentTimes(TextField, 1);
  });

  it('filters items and section items with case-insensitive search', () => {
    const actionList = mountWithApp(
      <ActionList
        items={[{content: 'IteM 1'}, {content: 'Item 2'}]}
        allowFiltering
        sections={[
          {
            title: 'Section 1',
            items: [{content: 'Item 3'}, {content: 'Item 4'}],
          },
          {
            title: 'Section 2',
            items: [
              {content: 'Item 4'},
              {content: 'Item 5'},
              {content: 'Item 6'},
              {content: 'Item 7'},
              {content: 'Item 8'},
              {content: 'Item 9'},
              {content: 'Item 10'},
            ],
          },
        ]}
      />,
    );

    const textField = actionList.find('input');
    textField!.trigger('onChange', {
      currentTarget: {
        value: 'item 1',
      },
    });

    expect(actionList).toContainReactComponentTimes(Item, 2);
    // First Section will have no title since items without a section are grouped into a Section automatically
    expect(actionList.findAll(Section)[1]).toContainReactText('Section 2');
  });
});
