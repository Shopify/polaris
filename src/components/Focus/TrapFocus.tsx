import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {addEventListener, removeEventListener} from '@shopify/javascript-utilities/events';
import autobind from '@shopify/javascript-utilities/autobind';
import Focus, {focusFirstFocusableChild} from './Focus';

export interface Props {
  children?: React.ReactNode,
}

export default class TrapFocus extends React.PureComponent<Props, {}> {
  private focusTrapWrapper: Node;

  componentDidMount() {
    const focusTrapWrapper = ReactDOM.findDOMNode(this);
    if (focusTrapWrapper) {
      addEventListener(focusTrapWrapper, 'focusout', this.handleBlur, {passive: false});
      this.focusTrapWrapper = focusTrapWrapper;
    }
  }

  componentWillUnmount() {
    if (this.focusTrapWrapper) {
      removeEventListener(this.focusTrapWrapper, 'focusout', this.handleBlur);
    }
  }

  render() {
    return (
      <Focus>
        {this.props.children}
      </Focus>
    );
  }

  @autobind
  private handleBlur(event: FocusEvent) {
    const {relatedTarget} = event;
    const focusTrapWrapper = this.focusTrapWrapper as HTMLElement;
    if (focusTrapWrapper && !focusTrapWrapper.contains(relatedTarget as HTMLElement)) {
      event.preventDefault();
      focusFirstFocusableChild(focusTrapWrapper);
    }
  }
}
