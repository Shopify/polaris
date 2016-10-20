// @flow
// see https://github.com/oliviertassinari/react-event-listener/

import {Component} from 'react';

type Props = {
  event: string,
  handler: (event: Object) => void,
  capture: boolean,
};

export default class EventListener extends Component {
  static defaultProps = {
    capture: false,
  };

  props: Props;

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
    const {event, handler, capture} = this.props;
    window.addEventListener(event, handler, capture);
  }

  detachListener() {
    const {event, handler, capture} = this.props;
    window.removeEventListener(event, handler, capture);
  }

  render() {
    return null;
  }
}
