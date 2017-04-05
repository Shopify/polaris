import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {write} from '@shopify/javascript-utilities/fastdom';

export const FOCUSABLE_SELECTOR = 'a,frame,iframe,input:not([type=hidden]),select,textarea,button,*[tabindex]';

export interface Props {
  children?: React.ReactNode,
}

export default class Focus extends React.PureComponent<Props, {}> {
  componentDidMount() {
    const child = ReactDOM.findDOMNode(this).firstElementChild;
    if (child) {
      const element = child as HTMLElement;
      if (!element.querySelector('[autofocus]')) {
         focusFirstFocusableChild(element);
      }
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export function focusFirstFocusableChild(element: HTMLElement) {
  const firstFocusable = element.querySelector(FOCUSABLE_SELECTOR) as HTMLElement;
  if (firstFocusable) {
    write(() => firstFocusable.focus());
  }
}
