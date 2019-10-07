import React from 'react';
import {createPortal} from 'react-dom';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {themeProvider} from '../shared';

export interface PortalProps {
  children?: React.ReactNode;
  idPrefix?: string;
  onPortalCreated?(): void;
}

interface State {
  isMounted: boolean;
}

const getUniqueID = createUniqueIDFactory('portal-');

export class Portal extends React.PureComponent<PortalProps, State> {
  static defaultProps = {idPrefix: ''};

  state: State = {isMounted: false};

  private portalNode: HTMLElement;
  private portalContainerNode: HTMLElement | null;

  private portalId =
    this.props.idPrefix !== ''
      ? `${this.props.idPrefix}-${getUniqueID()}`
      : getUniqueID();

  componentDidMount() {
    this.portalNode = document.createElement('div');
    this.portalNode.setAttribute('data-portal-id', this.portalId);
    this.portalContainerNode = document.querySelector(
      `${themeProvider.selector}`,
    );
    if (this.portalContainerNode != null) {
      this.portalContainerNode.appendChild(this.portalNode);
    }

    this.setState({isMounted: true});
  }

  componentDidUpdate(_: PortalProps, prevState: State) {
    const {onPortalCreated = noop} = this.props;
    if (!prevState.isMounted && this.state.isMounted) {
      onPortalCreated();
    }
  }

  componentWillUnmount() {
    if (this.portalContainerNode != null) {
      this.portalContainerNode.removeChild(this.portalNode);
    }
  }

  render() {
    return this.state.isMounted
      ? createPortal(this.props.children, this.portalNode)
      : null;
  }
}

function noop() {}
