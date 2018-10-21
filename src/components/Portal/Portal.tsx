import * as React from 'react';
import {createPortal} from 'react-dom';
import {createUniqueIDFactory, noop} from '@shopify/javascript-utilities/other';

export interface Props {
  children?: React.ReactNode;
  idPrefix?: string;
  onPortalCreated?(): void;
}

export interface State {
  isMounted: boolean;
}

const getUniqueID = createUniqueIDFactory('portal-');

export default class Portal extends React.PureComponent<Props, State> {
  static defaultProps = {idPrefix: ''};

  state: State = {isMounted: false};

  private portalNode: HTMLElement;

  private portalId =
    this.props.idPrefix !== ''
      ? `${this.props.idPrefix}-${getUniqueID()}`
      : getUniqueID();

  componentDidMount() {
    this.portalNode = document.createElement('div');
    this.portalNode.setAttribute('data-portal-id', this.portalId);
    document.body.appendChild(this.portalNode);
    this.setState({isMounted: true});
  }

  componentDidUpdate(_: Props, prevState: State) {
    const {onPortalCreated = noop} = this.props;
    if (!prevState.isMounted && this.state.isMounted) {
      onPortalCreated();
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.portalNode);
  }

  render() {
    return this.state.isMounted
      ? createPortal(this.props.children, this.portalNode)
      : null;
  }
}
