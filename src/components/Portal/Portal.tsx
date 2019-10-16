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

  state: State = {isMounted: false};

  private portalNode: HTMLElement;

  private portalId =
    this.props.idPrefix !== ''
      ? `${this.props.idPrefix}-${getUniqueID()}`
      : getUniqueID();

  componentDidMount() {
    // eslint-disable-next-line babel/camelcase
    const {UNSTABLE_cssCustomProperties} = this.context;
    this.portalNode = document.createElement('div');
    this.portalNode.setAttribute('data-portal-id', this.portalId);
    this.portalNode.setAttribute(
      'style',
      Object.entries(UNSTABLE_cssCustomProperties)
        .map((pair) => pair.join(':'))
        .join(';'),
    );
    document.body.appendChild(this.portalNode);
    this.setState({isMounted: true});
  }

  componentDidUpdate(_: PortalProps, prevState: State) {
    const {onPortalCreated = noop} = this.props;
    // eslint-disable-next-line babel/camelcase
    const {UNSTABLE_cssCustomProperties} = this.context;
    this.portalNode.setAttribute(
      'style',
      Object.entries(UNSTABLE_cssCustomProperties)
        .map((pair) => pair.join(':'))
        .join(';'),
    );
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
