import React, {PureComponent} from 'react';
import {createPortal} from 'react-dom';

import {ThemeContext} from '../../utilities/theme';
import {globalIdGeneratorFactory} from '../../utilities/unique-id';
import {portal} from '../shared';

export interface PortalProps {
  children?: React.ReactNode;
  idPrefix?: string;
  onPortalCreated?(): void;
}

interface State {
  isMounted: boolean;
}

export const UNIQUE_CONTAINER_ID = 'polaris-portal-container';

const getUniqueID = globalIdGeneratorFactory('portal-');

export class Portal extends PureComponent<PortalProps, State> {
  static defaultProps = {idPrefix: ''};
  static contextType = ThemeContext;
  context!: React.ContextType<typeof ThemeContext>;

  state: State = {isMounted: false};

  private portalNode: HTMLElement | null = null;

  private portalContainerNode: HTMLElement | null = null;

  private portalId =
    this.props.idPrefix !== ''
      ? `${this.props.idPrefix}-${getUniqueID()}`
      : getUniqueID();

  componentDidMount() {
    const constainerNode = document.getElementById(UNIQUE_CONTAINER_ID);

    this.portalContainerNode = constainerNode || document.createElement('div');

    if (!constainerNode)
      this.portalContainerNode.setAttribute('id', UNIQUE_CONTAINER_ID);
    this.portalNode = document.createElement('div');
    this.portalNode.setAttribute(portal.props[0], this.portalId);

    if (this.context != null && !constainerNode) {
      const {cssCustomProperties} = this.context;
      if (cssCustomProperties != null) {
        this.portalContainerNode.setAttribute('style', cssCustomProperties);
      } else {
        this.portalContainerNode.removeAttribute('style');
      }
    }

    if (!constainerNode) {
      document.body.appendChild(this.portalContainerNode);
    }

    this.portalContainerNode.appendChild(this.portalNode);

    this.setState({isMounted: true});
  }

  componentDidUpdate(_: PortalProps, prevState: State) {
    const {onPortalCreated = noop} = this.props;

    if (this.portalContainerNode && this.context != null) {
      const {cssCustomProperties, textColor} = this.context;
      if (cssCustomProperties != null) {
        const style = textColor
          ? `${cssCustomProperties};color:${textColor};`
          : `${cssCustomProperties}`;
        this.portalContainerNode.setAttribute('style', style);
      } else {
        this.portalContainerNode.removeAttribute('style');
      }
    }
    if (!prevState.isMounted && this.state.isMounted) {
      onPortalCreated();
    }
  }

  componentWillUnmount() {
    if (this.portalNode && this.portalContainerNode) {
      this.portalContainerNode.removeChild(this.portalNode);
      if (this.portalContainerNode.childElementCount === 0) {
        document.body.removeChild(this.portalContainerNode);
      }
    }
  }

  render() {
    return this.portalNode && this.state.isMounted
      ? createPortal(this.props.children, this.portalNode)
      : null;
  }
}

function noop() {}
