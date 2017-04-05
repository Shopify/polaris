import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {classNames} from '@shopify/react-utilities/styles';

import Scrollable from '../Scrollable';

import * as styles from './Frame.scss';

export interface Props {
  children?: React.ReactNode,
  sidebar?: React.ReactNode,
  header?: React.ReactNode,
  showSidebar?: boolean,
  onSidebarDismiss?(): void,
};

export interface State {
  isTransitioning?: boolean,
  needsSetup?: boolean,
}

export default class Frame extends React.PureComponent<Props, State> {
  state: State = {
    isTransitioning: false,
    needsSetup: false,
  };

  private sidebarContainer: HTMLElement;

  componentWillReceiveProps(newProps: Props) {
    if (Boolean(newProps.showSidebar) !== Boolean(this.props.showSidebar)) {
      this.setState({needsSetup: false, isTransitioning: true});
    }
  }

  componentDidUpdate() {
    if (this.state.needsSetup) {
      // We need to do this in order to perform setup on initial mount.
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({needsSetup: false});
    }
  }

  componentDidMount() {
    if (this.sidebarContainer == null) { return; }
    this.sidebarContainer.addEventListener('transitionend', this.handleTransitionEnd);
  }

  componentWillUnmount() {
    if (this.sidebarContainer == null) { return; }
    this.sidebarContainer.removeEventListener('transitionend', this.handleTransitionEnd);
  }

  render() {
    const {isTransitioning, needsSetup} = this.state;
    const {children, sidebar, header, showSidebar} = this.props;

    const className = classNames(
      styles.Sidebar,
      !needsSetup && showSidebar && styles.isShowing,
      isTransitioning && styles.isTransitioning,
    );

    const sidebarMarkup = sidebar
      ? (
        <div
          className={className}
          ref={this.setSidebarContainerRef}
        >
          {sidebar}
        </div>
      )
      : null;

    const headerMarkup = header
      ? <div className={styles.Header}>{header}</div>
      : null;

    return (
      <div className={styles.Frame}>
        {sidebarMarkup}

        <div
          className={classNames(styles.SidebarOverlay, showSidebar && styles.isCovering)}
          onClick={this.handleSidebarDismiss}
        />

        <div className={styles.Content}>
          {headerMarkup}
          <Scrollable className={styles.Main}>
            {children}
          </Scrollable>
        </div>
      </div>
    );
  }

  @autobind
  private handleTransitionEnd() {
    this.setState({isTransitioning: false});
  }

  @autobind
  private handleSidebarDismiss() {
    if (this.props.onSidebarDismiss != null) {
      this.props.onSidebarDismiss();
    }
  }

  @autobind
  private setSidebarContainerRef(node: HTMLElement) {
    this.sidebarContainer = node;
  }
}
