import React from 'react';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import isEqual from 'lodash/isEqual';

export interface FocusProps {
  children?: React.ReactNode;
  disabled?: boolean;
  root: HTMLElement | null;
}

export class Focus extends React.PureComponent<FocusProps, never> {
  componentDidMount() {
    this.handleSelfFocus();
  }

  componentDidUpdate({children: prevChildren, ...restPrevProps}: FocusProps) {
    const {children, ...restProps} = this.props;

    if (isEqual(restProps, restPrevProps) || !restPrevProps.root) {
      return;
    }

    this.handleSelfFocus();
  }

  handleSelfFocus() {
    const {disabled, root} = this.props;
    if (disabled) {
      return;
    }

    if (root) {
      if (!root.querySelector('[autofocus]')) {
        focusFirstFocusableNode(root, false);
      }
    }
  }

  render() {
    const {children} = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}
