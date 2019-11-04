/*
A component which allows you to trap keyboard focus inside of a container.

TrapFocus internally employs `Focus` to focus it's first focusable child on mount.

Whenever a `blur` event occurs that would take the user outside the trap, we reset to the first focusable child.

If you want to cease trapping focus, simply cease rendering the trap.
*/

import React from 'react';
import {
  focusFirstFocusableNode,
  findFirstFocusableNode,
  focusLastFocusableNode,
} from '@shopify/javascript-utilities/focus';
import {write} from '@shopify/javascript-utilities/fastdom';

import {EventListener} from '../EventListener';
import {Focus} from '../Focus';

export interface TrapFocusProps {
  trapping?: boolean;
  children?: React.ReactNode;
}

interface State {
  shouldFocusSelf: boolean | undefined;
}

export class TrapFocus extends React.PureComponent<TrapFocusProps, State> {
  state: State = {
    shouldFocusSelf: undefined,
  };

  private focusTrapWrapper: HTMLElement;

  componentDidMount() {
    this.setState(this.handleTrappingChange());
  }

  handleTrappingChange() {
    const {trapping = true} = this.props;

    if (this.focusTrapWrapper.contains(document.activeElement)) {
      return {shouldFocusSelf: false};
    }

    return {shouldFocusSelf: trapping};
  }

  render() {
    const {children} = this.props;

    return (
      <Focus disabled={this.shouldDisable} root={this.focusTrapWrapper}>
        <div ref={this.setFocusTrapWrapper} style={{background: 'salmon'}}>
          <EventListener event="focusout" handler={this.handleBlur} />
          {children}
        </div>
      </Focus>
    );
  }

  private get shouldDisable() {
    const {trapping = true} = this.props;
    const {shouldFocusSelf} = this.state;

    if (shouldFocusSelf === undefined) {
      return true;
    }

    return shouldFocusSelf ? !trapping : !shouldFocusSelf;
  }

  private setFocusTrapWrapper = (node: HTMLDivElement) => {
    this.focusTrapWrapper = node;
  };

  private handleBlur = (event: FocusEvent) => {
    const {relatedTarget: currentTarget} = event;
    const {focusTrapWrapper} = this; // the div around the modal
    const {trapping = true} = this.props;

    if (currentTarget == null || trapping === false) {
      // do nothing
      // return;
    }

    // if we have declared a container
    // and the currently selected element is outside of that container
    // and the current target has no parent with the `data-polaris-overlay` property
    if (
      focusTrapWrapper &&
      !focusTrapWrapper.contains(currentTarget as HTMLElement) // &&
      // !closest(currentTarget as HTMLElement, '[data-polaris-overlay]')
    ) {
      event.preventDefault();

      if (event.srcElement === findFirstFocusableNode(focusTrapWrapper)) {
        // !!
        return focusLastFocusableNode(focusTrapWrapper);
      }
      const firstNode = findFirstFocusableNode(focusTrapWrapper) as HTMLElement;
      write(() => focusFirstFocusableNode(firstNode));
    }
  };
}
