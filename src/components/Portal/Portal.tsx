import * as React from 'react';
import {createPortal} from 'react-dom';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {isServer} from '@shopify/react-utilities/target';

export interface Props {
  children?: React.ReactNode;
  idPrefix?: string;
}

const getUniqueID = createUniqueIDFactory('portal-');

export default class Portal extends React.PureComponent<Props, never> {
  static defaultProps = {idPrefix: ''};

  private portalNode: HTMLElement;

  private portalId =
    this.props.idPrefix !== ''
      ? `${this.props.idPrefix}-${getUniqueID()}`
      : getUniqueID();

  componentWillMount() {
    if (isServer) {
      return;
    }
    this.portalNode = document.createElement('div');
    this.portalNode.setAttribute('data-portal-id', this.portalId);
    document.body.appendChild(this.portalNode);
  }

  componentWillUnmount() {
    if (isServer) {
      return;
    }
    document.body.removeChild(this.portalNode);
  }

  render() {
    if (isServer) {
      return null;
    }
    return createPortal(this.props.children, this.portalNode);
  }
}
