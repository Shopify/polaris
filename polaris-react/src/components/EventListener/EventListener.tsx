import {PureComponent} from 'react';

interface BaseEventProps {
  event: string;
  capture?: boolean;
  handler(event: Event): void;
  window?: Window | null;
}

export interface EventListenerProps extends BaseEventProps {
  passive?: boolean;
}

/** @deprecated Use the useEventListener hook instead. */
export class EventListener extends PureComponent<EventListenerProps, never> {
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
    const {event, handler, capture, passive, window: customWindow} = this.props;
    const window = customWindow || globalThis.window;
    window.addEventListener(event, handler, {capture, passive});
  }

  private detachListener(prevProps?: BaseEventProps) {
    const {
      event,
      handler,
      capture,
      window: customWindow,
    } = prevProps || this.props;
    const window = customWindow || globalThis.window;
    window.removeEventListener(event, handler, capture);
  }
}
