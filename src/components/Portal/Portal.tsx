import React from 'react';
import {createPortal} from 'react-dom';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import {ThemeContext} from '../../utilities/theme';
import {portal} from '../shared';

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
  static contextType = ThemeContext;
  context!: React.ContextType<typeof ThemeContext>;

  state: State = {isMounted: false};

  private portalNode: HTMLElement | null = null;

  private portalId =
    this.props.idPrefix !== ''
      ? `${this.props.idPrefix}-${getUniqueID()}`
      : getUniqueID();

  componentDidMount() {
    this.portalNode = document.createElement('div');
    this.portalNode.setAttribute(portal.props[0], this.portalId);

    if (this.context != null) {
      const {cssCustomProperties} = this.context;
      if (cssCustomProperties != null) {
        this.portalNode.setAttribute('style', cssCustomProperties);
      } else {
        this.portalNode.removeAttribute('style');
      }
    }
    document.body.appendChild(this.portalNode);
    this.setState({isMounted: true});
  }

  componentDidUpdate(_: PortalProps, prevState: State) {
    const {onPortalCreated = noop} = this.props;

    if (this.portalNode && this.context != null) {
      const {cssCustomProperties, textColor} = this.context;
      if (cssCustomProperties != null) {
        const style = `${cssCustomProperties};color:${textColor};`;
        this.portalNode.setAttribute('style', style);
      } else {
        this.portalNode.removeAttribute('style');
      }
    }
    if (!prevState.isMounted && this.state.isMounted) {
      onPortalCreated();
    }
  }

  componentWillUnmount() {
    if (this.portalNode) {
      document.body.removeChild(this.portalNode);
    }
  }

  render() {
    return this.portalNode && this.state.isMounted
      ? createPortal(this.props.children, this.portalNode)
      : null;
  }
}

function noop() {}
