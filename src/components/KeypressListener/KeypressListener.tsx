import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {Key} from '../../types';

export interface Props {
  keyValue: Key;
  handler(event: KeyboardEvent): void;
}

export default class KeypressListener extends React.Component<Props, never> {
  componentDidMount() {
    addEventListener(document, 'keyup', this.handleKeyEvent);
  }

  componentWillUnmount() {
    removeEventListener(document, 'keyup', this.handleKeyEvent);
  }

  render() {
    return null;
  }

  @autobind
  private handleKeyEvent(event: KeyboardEvent) {
    const {keyValue, handler} = this.props;

    if (event.key === keyValue) {
      handler(event);
    }
  }
}
