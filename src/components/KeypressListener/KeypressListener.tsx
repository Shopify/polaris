import React from 'react';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {Key} from '../../types';

export interface KeypressListenerProps {
  keyCode: Key;
  handler(event: KeyboardEvent): void;
  keyEventName?: 'keyup' | 'keydown';
}

export class KeypressListener extends React.Component<
  KeypressListenerProps,
  never
> {
  componentDidMount() {
    const {keyEventName = 'keyup'} = this.props;
    addEventListener(document, keyEventName, this.handleKeyEvent);
  }

  componentWillUnmount() {
    const {keyEventName = 'keyup'} = this.props;
    removeEventListener(document, keyEventName, this.handleKeyEvent);
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
