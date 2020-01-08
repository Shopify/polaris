import React from 'react';
import {closest} from '@shopify/javascript-utilities/dom';
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

  private focusTrapWrapper: HTMLElement | null = null;

  componentDidMount() {
    this.setState(this.handleTrappingChange());
  }

  handleTrappingChange() {
    const {trapping = true} = this.props;

    if (
      this.focusTrapWrapper &&
      this.focusTrapWrapper.contains(document.activeElement)
    ) {
      return {shouldFocusSelf: false};
    }

    return {shouldFocusSelf: trapping};
  }

  render() {
    const {children} = this.props;

    return (
      <Focus disabled={this.shouldDisable()} root={this.focusTrapWrapper}>
        <div ref={this.setFocusTrapWrapper}>
          <EventListener event="focusout" handler={this.handleBlur} />
          {children}
        </div>
      </Focus>
    );
  }

  private shouldDisable() {
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
    const {relatedTarget} = event;
    const {focusTrapWrapper} = this;
    const {trapping = true} = this.props;

    if (relatedTarget == null || trapping === false) {
      return;
    }

    if (
      focusTrapWrapper &&
      !focusTrapWrapper.contains(relatedTarget as HTMLElement) &&
      (!relatedTarget ||
        !closest(relatedTarget as HTMLElement, '[data-polaris-overlay]'))
    ) {
      event.preventDefault();

      if (event.srcElement === findFirstFocusableNode(focusTrapWrapper)) {
        return write(() => focusLastFocusableNode(focusTrapWrapper));
      }
      const firstNode =
        findFirstFocusableNode(focusTrapWrapper) || focusTrapWrapper;
      write(() => focusFirstFocusableNode(firstNode));
    }
  };
}
