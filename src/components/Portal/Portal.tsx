import React from 'react';
import {createPortal} from 'react-dom';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {ThemeContext} from '../../utilities/theme';

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
    this.portalNode.setAttribute('data-portal-id', this.portalId);

    if (this.context != null) {
      /* eslint-disable babel/camelcase */
      const {UNSTABLE_cssCustomProperties = ''} = this.context;
      this.portalNode.setAttribute('style', UNSTABLE_cssCustomProperties);
    }
    document.body.appendChild(this.portalNode);
    this.setState({isMounted: true});
  }

  componentDidUpdate(_: PortalProps, prevState: State) {
    const {onPortalCreated = noop} = this.props;

    if (this.context != null) {
      const {UNSTABLE_cssCustomProperties = ''} = this.context;
      this.portalNode.setAttribute(
        'style',
        UNSTABLE_cssCustomProperties,
        /* eslint-enable babel/camelcase */
      );
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
