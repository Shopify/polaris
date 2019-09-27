import React from 'react';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {Key} from '../../types';

export interface KeypressListenerProps {
  keyCode: Key;
  handler(event: KeyboardEvent): void;
}

export class KeypressListener extends React.Component<
  KeypressListenerProps,
  never
> {
  componentDidMount() {
    addEventListener(document, 'keyup', this.handleKeyEvent);
  }

  componentWillUnmount() {
    removeEventListener(document, 'keyup', this.handleKeyEvent);
  }

  render() {
    return null;
  }

  private handleKeyEvent = (event: KeyboardEvent) => {
    const {keyCode, handler} = this.props;

    if (event.keyCode === keyCode) {
      handler(event);
    }
  };
}
