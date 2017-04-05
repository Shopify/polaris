import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import Keys from './Keys';

export interface Props {
  keyCode: Keys,
  callback(event: Event): void,
}

export default class KeypressListener extends React.Component<Props, {}> {
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyEvent);
  }

  // tslint:disable-next-line prefer-function-over-method
  render() {
    return null;
  }

  @autobind
  private handleKeyEvent(event: KeyboardEvent) {
    const {keyCode, callback} = this.props;

    if (event.keyCode === keyCode) {
      callback(event);
    }
  }
}
