import React from 'react';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';

interface BaseEventProps {
  event: string;
  capture?: boolean;
  handler(event: Event): void;
}

export interface EventListenerProps extends BaseEventProps {
  passive?: boolean;
}

// see https://github.com/oliviertassinari/react-event-listener/
export class EventListener extends React.PureComponent<
  EventListenerProps,
  never
> {
  componentDidMount() {
    this.attachListener();
  }

  componentDidUpdate({passive, ...detachProps}: EventListenerProps) {
    this.detachListener(detachProps);
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

  private detachListener(prevProps?: BaseEventProps) {
    const {event, handler, capture} = prevProps || this.props;
    removeEventListener(window, event, handler, capture);
  }
}
