// see https://github.com/oliviertassinari/react-event-listener/

import {Component, PropTypes} from 'react';

export default class EventListener extends Component {
  static propTypes = {
    event: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    capture: PropTypes.bool.isRequired,
  };

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
