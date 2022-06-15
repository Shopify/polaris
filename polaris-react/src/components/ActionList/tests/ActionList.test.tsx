import React from 'react';
import {ImportMinor, ExportMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {ActionList} from '../ActionList';
import {Badge} from '../../Badge';
import {Item, Section} from '../components';
import {Key} from '../../../types';
import {KeypressListener} from '../../KeypressListener';

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
              {content: 'Import file', icon: ImportMinor},
              {content: 'Export file', icon: ExportMinor},
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
              {content: 'Import file', icon: ImportMinor},
              {content: 'Export file', icon: ExportMinor},
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
          {content: 'Add discount', badge: {status: 'new', content: 'badge'}},
        ]}
        onActionAnyItem={mockOnActionAnyItem}
        actionRole="option"
      />,
    );
    expect(actionList).toContainReactComponent(Badge, {
      children: 'badge',
      status: 'new',
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
});
