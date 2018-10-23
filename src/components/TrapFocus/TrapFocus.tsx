import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {closest} from '@shopify/javascript-utilities/dom';
import {
  focusFirstFocusableNode,
  findFirstFocusableNode,
  focusLastFocusableNode,
} from '@shopify/javascript-utilities/focus';

import {EventListener, Focus} from '../../components';

export interface Props {
  trapping?: boolean;
  children?: React.ReactNode;
}

export default class TrapFocus extends React.PureComponent<Props, never> {
  private focusTrapWrapper: HTMLElement | null = null;

  render() {
    const {children, trapping = true} = this.props;

    return (
      <Focus disabled={!trapping}>
        <div ref={this.setFocusTrapWrapper}>
          <EventListener event="focusout" handler={this.handleBlur} />
          {children}
        </div>
      </Focus>
    );
  }

  @autobind
  private setFocusTrapWrapper(node: HTMLDivElement) {
    this.focusTrapWrapper = node;
  }

  @autobind
  private handleBlur(event: FocusEvent) {
    const {relatedTarget} = event;
    const {focusTrapWrapper} = this;
    const {trapping = true} = this.props;

    if (relatedTarget == null || trapping === false) {
      return;
    }

    if (
      focusTrapWrapper &&
      !focusTrapWrapper.contains(relatedTarget as HTMLElement) &&
      !closest(relatedTarget as HTMLElement, '[data-polaris-overlay]')
    ) {
      event.preventDefault();

      if (event.srcElement === findFirstFocusableNode(focusTrapWrapper)) {
        return focusLastFocusableNode(focusTrapWrapper);
      }
      focusFirstFocusableNode(focusTrapWrapper);
    }
  }
}
