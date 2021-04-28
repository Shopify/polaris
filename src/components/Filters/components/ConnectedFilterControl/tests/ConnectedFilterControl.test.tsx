import React from 'react';
import {Popover, Button} from 'components';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, ReactWrapper} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {
  ConnectedFilterControl,
  ConnectedFilterControlProps,
} from '../ConnectedFilterControl';

const MockChild = () => <div />;
const MockFilter = () => <div />;
const MockAux = () => <div />;

type ArrayElement<T> = T extends (infer U)[] ? U : never;

type PopoverableAction = ArrayElement<
  ConnectedFilterControlProps['rightPopoverableActions']
>;

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

  it('always render a RightAction if forceShowMorefiltersButton is true', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl
        rightAction={mockRightAction}
        forceShowMorefiltersButton
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Button).exists()).toBe(true);
  });

  it('renders a RightAction if forceShowMorefiltersButton is false and rightPopoverableActions do not fit on the "right action" container', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl
        rightAction={mockRightAction}
        rightPopoverableActions={[mockRightOpenPopoverableAction]}
        forceShowMorefiltersButton={false}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Button).exists()).toBe(true);
  });

  it('does not render a RightAction there are no actions hidden', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl
        rightAction={mockRightAction}
        forceShowMorefiltersButton={false}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Button).exists()).toBe(false);
  });

  it('renders rightActionMarkup if rightAction is not null', () => {
    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl
        rightAction={mockRightAction}
        forceShowMorefiltersButton={false}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl).toContainReactComponent('div', {
      className: 'MoreFiltersButtonContainer onlyButtonVisible',
    });
  });

  it('does not render rightActionMarkup if rightAction is null', () => {
    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl
        rightAction={null}
        forceShowMorefiltersButton={false}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl).not.toContainReactComponent('div', {
      className: 'MoreFiltersButtonContainer onlyButtonVisible',
    });
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

  it('hides an action if it does not fit', () => {
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

    connectedFilterControl.setState({availableWidth: 100});

    expect(findActions(connectedFilterControl)).toHaveLength(2);
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
    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl
        rightPopoverableActions={[
          mockRightOpenPopoverableAction,
          {...mockRightClosedPopoverableAction, disabled: true},
        ]}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl).toContainReactComponentTimes(Button, 1, {
      disclosure: true,
      disabled: true,
    });
  });

  it('disables each activator buttons when prop disabled is passed', () => {
    const rightPopoverableActions = [
      mockRightClosedPopoverableAction,
      mockRightOpenPopoverableAction,
    ];

    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl
        rightPopoverableActions={rightPopoverableActions}
        disabled
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl).toContainReactComponentTimes(Button, 2, {
      disclosure: true,
      disabled: true,
    });
  });

  it('does not render CenterContainer when no child element is "null"', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl>{null}</ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find('.CenterContainer')).toHaveLength(0);
  });

  it('renders CenterContainer when no child element is not "null"', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find('.CenterContainer')).toHaveLength(1);
  });
});

function noop() {}

function findActions(wrapper: ReactWrapper) {
  // this omits the invisible proxy actions used for measuring width
  return wrapper.find('.Wrapper Button');
}
