import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Button} from '../../../../Button';
import {Popover} from '../../../../Popover';
import styles from '../ConnectedFilterControl.scss';
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
  popoverContent: <MockFilter />,
  key: 'openAction',
  content: 'Open action',
  onAction: noop,
};

const mockRightClosedPopoverableAction: PopoverableAction = {
  popoverOpen: false,
  popoverContent: <MockFilter />,
  key: 'closedAction',
  content: 'Closed action',
  onAction: noop,
};

const mockRightAction = <Button onClick={noop}>Right Action</Button>;

describe('<ConnectedFilterControl />', () => {
  it('mounts', () => {
    expect(() => {
      mountWithApp(
        <ConnectedFilterControl>
          <MockChild />
        </ConnectedFilterControl>,
      );
    }).not.toThrow();
  });

  it('does not render buttons without right actions or right popoverable actions', () => {
    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl).not.toContainReactComponent(Button);
  });

  it('does not render popovers without right popoverable actions', () => {
    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl).not.toContainReactComponent(Popover);
  });

  it('always render a RightAction if forceShowMorefiltersButton is true', () => {
    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl
        rightAction={mockRightAction}
        forceShowMorefiltersButton
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl).toContainReactComponent(Button);
  });

  it('renders a RightAction if forceShowMorefiltersButton is false and rightPopoverableActions do not fit on the "right action" container', () => {
    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl
        rightAction={mockRightAction}
        rightPopoverableActions={[mockRightOpenPopoverableAction]}
        forceShowMorefiltersButton={false}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl).toContainReactComponent(Button);
  });

  it('does not render a RightAction there are no actions hidden', () => {
    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl
        rightAction={mockRightAction}
        forceShowMorefiltersButton={false}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl).not.toContainReactComponent(Button);
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
    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl
        rightPopoverableActions={[mockRightOpenPopoverableAction]}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl).toContainReactComponentTimes(Button, 1);
  });

  it('renders three buttons with two popoverable actions and a right action', () => {
    const connectedFilterControl = mountWithApp(
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

    expect(connectedFilterControl).toContainReactComponentTimes(Button, 3);
  });

  it('hides an action if it does not fit', () => {
    const connectedFilterControl = mountWithApp(
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

    connectedFilterControl.instance.setState({availableWidth: 100});

    connectedFilterControl.forceUpdate();

    const wrapper = connectedFilterControl.find('div', {
      className: styles.Wrapper,
    })!;

    expect(wrapper).toContainReactComponentTimes(Button, 2);
  });

  it('renders auxiliary content', () => {
    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl auxiliary={<MockAux />}>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl).toContainReactComponent(MockAux);
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
    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl>{null}</ConnectedFilterControl>,
    );

    expect(connectedFilterControl).not.toContainReactComponent('div', {
      className: expect.stringContaining('CenterContainer'),
    });
  });

  it('renders CenterContainer when no child element is not "null"', () => {
    const connectedFilterControl = mountWithApp(
      <ConnectedFilterControl>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl).toContainReactComponentTimes('div', 1, {
      className: expect.stringContaining('CenterContainer'),
    });
  });
});

function noop() {}
