import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import isObjectsEqual from '../../utilities/isObjectsEqual';

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

    if (isObjectsEqual(restProps, restPrevProps)) {
      return;
    }

    this.handleSelfFocus();
  }

  handleSelfFocus() {
    if (this.props.disabled) {
      return;
    }

    const root = ReactDOM.findDOMNode(this) as HTMLElement | null;
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
