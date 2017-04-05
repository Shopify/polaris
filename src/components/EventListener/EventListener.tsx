// see https://github.com/oliviertassinari/react-event-listener/
import * as React from 'react';
import {addEventListener, removeEventListener} from '@shopify/javascript-utilities/events';

export interface Props {
  event: string,
  capture?: boolean,
  passive?: boolean,
  handler(event: Object): void,
}

export default class EventListener extends React.PureComponent<Props, {}> {
  static defaultProps = {
    capture: false,
  };

  componentDidMount() {
    this.attachListener();
  }

  componentWillUpdate() {
    this.detachListener();
  }

  componentDidUpdate() {
    this.attachListener();
  }

  componentWillUnmount() {
    this.detachListener();
  }

  attachListener() {
    const {event, handler, capture, passive} = this.props;
    addEventListener(window, event, handler, {capture, passive});
  }

  detachListener() {
    const {event, handler, capture} = this.props;
    removeEventListener(window, event, handler, capture);
  }

  // tslint:disable-next-line prefer-function-over-method
  render(): null {
    return null;
  }
}
