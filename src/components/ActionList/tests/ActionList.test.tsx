import React from 'react';
import {ImportMinor, ExportMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'test-utilities';

import {ActionList} from '../ActionList';
import {Badge} from '../../Badge';
import {Item, Section} from '../components';

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

  it('passes firstSection=true to the first Section', () => {
    const actionList = mountWithApp(
      <ActionList
        sections={[
          {title: 'One', items: [{content: 'First section'}]},
          {title: 'Two', items: [{content: 'Second section'}]},
        ]}
        onActionAnyItem={mockOnActionAnyItem}
        actionRole="option"
      />,
    );

    const {firstSection} = actionList.find(Section)!.props;

    expect(firstSection).toBe(true);
  });

  it('passes firstSection=false to sections that are not the first', () => {
    const actionList = mountWithApp(
      <ActionList
        sections={[
          {title: 'One', items: [{content: 'First section'}]},
          {title: 'Two', items: [{content: 'Second section'}]},
        ]}
        onActionAnyItem={mockOnActionAnyItem}
        actionRole="option"
      />,
    );

    const sections = actionList.findAll(Section);
    const {firstSection} = sections[sections.length - 1].props;

    expect(firstSection).toBe(false);
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
});
