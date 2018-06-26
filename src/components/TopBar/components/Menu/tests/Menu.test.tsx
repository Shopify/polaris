import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider, trigger} from '../../../../../../tests/utilities';

import {ActionList, Popover} from '../../../../../components';
import Menu from '../Menu';
import Message from '../components/Message';

describe('<Menu />', () => {
  const defaultProps = {
    activator: 'Activate',
    actions: [],
    onOpen: noop,
    onClose: noop,
    open: false,
    message: {
      title: 'polaris',
      description: 'hello polaris',
      action: {onClick: noop, content: 'onClick'},
      link: {
        to: '/',
        content: 'Home',
      },
    },
  };

  it('renders the activator content', () => {
    const content = <div>Hello</div>;
    const menu = mountWithAppProvider(
      <Menu {...defaultProps} activator={content} />,
    );

    expect(menu.contains(content)).toBe(true);
  });

  it('passes the actions prop down to the ActionList component', () => {
    const actions = [
      {
        items: [
          {
            content: 'foo',
          },
        ],
      },
    ];

    const menu = mountWithAppProvider(
      <Menu {...defaultProps} actions={actions} open />,
    );

    expect(menu.find(ActionList).prop('sections')).toBe(actions);
  });

  it('passes the open prop down to the Popover component', () => {
    const menu = mountWithAppProvider(<Menu {...defaultProps} open />);

    const popover = menu.find(Popover);

    expect(popover.prop('active')).toBe(true);
  });

  it('calls the onClose prop in the Popover onClose', () => {
    const onClose = jest.fn();
    const menu = mountWithAppProvider(
      <Menu {...defaultProps} onClose={onClose} open />,
    );

    trigger(menu.find(Popover), 'onClose');
    expect(onClose).toHaveBeenCalled();
  });

  it('calls the onClose callback when clicking on any ActionList item', () => {
    const onClose = jest.fn();
    const menu = mountWithAppProvider(
      <Menu {...defaultProps} onClose={onClose} open />,
    );

    trigger(menu.find(ActionList), 'onActionAnyItem');
    expect(onClose).toHaveBeenCalled();
  });

  it('calls the onOpen callback when clicking on the activator button', () => {
    const onOpenCallback = jest.fn();
    const menu = mountWithAppProvider(
      <Menu {...defaultProps} onOpen={onOpenCallback} />,
    );

    trigger(menu.find('button'), 'onClick');
    expect(onOpenCallback).toHaveBeenCalled();
  });

  it('renders the message content when a message is provided', () => {
    const menu = mountWithAppProvider(<Menu {...defaultProps} />);

    expect(menu.find(Message)).toBeTruthy();
  });
});
