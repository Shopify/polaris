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

  private portalNode: HTMLElement;

  private portalId =
    this.props.idPrefix !== ''
      ? `${this.props.idPrefix}-${getUniqueID()}`
      : getUniqueID();

  componentDidMount() {
    this.portalNode = document.createElement('div');
    this.portalNode.setAttribute(portal.props[0], this.portalId);

    if (this.context != null) {
      const {UNSTABLE_cssCustomProperties} = this.context;
      if (UNSTABLE_cssCustomProperties != null) {
        this.portalNode.setAttribute('style', UNSTABLE_cssCustomProperties);
      } else {
        this.portalNode.removeAttribute('style');
      }
    }
    document.body.appendChild(this.portalNode);
    this.setState({isMounted: true});
  }

  componentDidUpdate(_: PortalProps, prevState: State) {
    const {onPortalCreated = noop} = this.props;

    if (this.context != null) {
      const {UNSTABLE_cssCustomProperties, textColor} = this.context;
      if (UNSTABLE_cssCustomProperties != null) {
        const style = `${UNSTABLE_cssCustomProperties};color:${textColor};`;
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
    document.body.removeChild(this.portalNode);
  }

  render() {
    return this.state.isMounted
      ? createPortal(this.props.children, this.portalNode)
      : null;
  }
}

function noop() {}
