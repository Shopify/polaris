import * as React from 'react';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';

export interface Props {
  event: string;
  capture?: boolean;
  passive?: boolean;
  handler(event: Event): void;
}

// see https://github.com/oliviertassinari/react-event-listener/
export default class EventListener extends React.PureComponent<Props, never> {
  componentDidMount() {
    this.attachListener();
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillUpdate() {
    this.detachListener();
  }

  componentDidUpdate() {
    this.attachListener();
  }

  componentWillUnmount() {
    this.detachListener();
  }

  render() {
    return null;
  }

  private attachListener() {
    const {event, handler, capture, passive} = this.props;
    addEventListener(window, event, handler, {capture, passive});
  }

  private detachListener() {
    const {event, handler, capture} = this.props;
    removeEventListener(window, event, handler, capture);
  }
}
