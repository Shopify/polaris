import React from 'react';
import {ReactWrapper} from 'enzyme';

import {Popover, Button} from 'components';
import {mountWithAppProvider} from 'test-utilities/legacy';

import {
  ConnectedFilterControl,
  PopoverableAction,
} from '../ConnectedFilterControl';

const MockChild = () => <div />;
const MockFilter = () => <div />;
const MockAux = () => <div />;

const mockRightOpenPopoverableAction: PopoverableAction = {
  popoverOpen: true,
  popoverContent: MockFilter,
  key: 'openAction',
  content: 'Open action',
  onAction: noop,
};

const mockRightClosedPopoverableAction: PopoverableAction = {
  popoverOpen: false,
  popoverContent: MockFilter,
  key: 'closedAction',
  content: 'Closed action',
  onAction: noop,
};

const mockRightAction = <Button onClick={noop}>Right Action</Button>;

describe('<ConnectedFilterControl />', () => {
  it('mounts', () => {
    expect(() => {
      mountWithAppProvider(
        <ConnectedFilterControl>
          <MockChild />
        </ConnectedFilterControl>,
      );
    }).not.toThrow();
  });

  it('does not render buttons without right actions or right popoverable actions', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Button).exists()).toBe(false);
  });

  it('does not render popovers without right popoverable actions', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Popover).exists()).toBe(false);
  });

  it('does render a button with a right action', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl rightAction={mockRightAction}>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Button).exists()).toBe(true);
  });

  it('does render a button with a popoverable action', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl
        rightPopoverableActions={[mockRightOpenPopoverableAction]}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Button)).toHaveLength(1);
  });

  it('renders three buttons with two popoverable actions and a right action', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl
        rightPopoverableActions={[
          mockRightOpenPopoverableAction,
          mockRightClosedPopoverableAction,
        ]}
        rightAction={mockRightAction}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Button)).toHaveLength(3);
  });

  it('renders auxiliary content', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl auxiliary={<MockAux />}>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(MockAux).exists()).toBe(true);
  });

  it('only disables activators of inactive rightPopoverableActions', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl
        rightPopoverableActions={[
          mockRightOpenPopoverableAction,
          {...mockRightClosedPopoverableAction, disabled: true},
        ]}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    const inactiveActivator = findById(
      connectedFilterControl,
      `Activator-closedAction`,
    );

    const activeActivator = findById(
      connectedFilterControl,
      `Activator-openAction`,
    );

    expect(inactiveActivator.props()).toHaveProperty('disabled', true);
    expect(activeActivator.prop('disabled')).toBeUndefined();
  });

  it('disables each activator buttons when prop disabled is passed', () => {
    const rightPopoverableActions = [
      mockRightClosedPopoverableAction,
      mockRightOpenPopoverableAction,
    ];

    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl
        rightPopoverableActions={rightPopoverableActions}
        disabled
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    rightPopoverableActions.forEach((action) => {
      const activator = findById(
        connectedFilterControl,
        `Activator-${action.key}`,
      );

      expect(activator.prop('disabled')).toBe(true);
    });
  });
});

function noop() {}

function findById(wrapper: ReactWrapper, id: string) {
  return wrapper.find(`#${id}`).first();
}
