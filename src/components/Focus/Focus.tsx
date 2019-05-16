import React from 'react';
import {findDOMNode} from 'react-dom';
import isEqual from 'lodash/isEqual';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';

export interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
}

export default class Focus extends React.PureComponent<Props, never> {
  componentDidMount() {
    this.handleSelfFocus();
  }

  componentDidUpdate({children: prevChildren, ...restPrevProps}: Props) {
    const {children, ...restProps} = this.props;

    if (isEqual(restProps, restPrevProps)) {
      return;
    }

    this.handleSelfFocus();
  }

  handleSelfFocus() {
    if (this.props.disabled) {
      return;
    }

    const root = findDOMNode(this) as HTMLElement | null;
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
