import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {write} from '@shopify/javascript-utilities/fastdom';

export interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
}

export default class Focus extends React.PureComponent<Props, never> {
  componentDidMount() {
    if (this.props.disabled) {
      return;
    }

    write(() => {
      const root = ReactDOM.findDOMNode(this) as HTMLElement | null;
      if (root) {
        if (!root.querySelector('[autofocus]')) {
          focusFirstFocusableNode(root, false);
        }
      }
    });
  }

  render() {
    const Fragment = (React as any).Fragment;
    const {children} = this.props;

    return <Fragment>{children}</Fragment>;
  }
}
