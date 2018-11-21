import * as React from 'react';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';

export interface BaseEventProps {
  event: string;
  capture?: boolean;
  handler(event: Event): void;
}

export interface Props extends BaseEventProps {
  passive?: boolean;
}

// see https://github.com/oliviertassinari/react-event-listener/
export default class EventListener extends React.PureComponent<Props, never> {
  componentDidMount() {
    this.attachListener();
  }

  componentDidUpdate({passive, ...detachProps}: Props) {
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
