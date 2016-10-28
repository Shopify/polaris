// @flow

import React, {Component} from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import styles from './Frame.scss';

type Props = {
  children?: any,
  sidebar?: React$Element<*>,
  showSidebar?: boolean,
  onSidebarDismiss?: () => void,
};

type State = {
  isTransitioning: boolean,
  needsSetup: boolean,
};

export default class Frame extends Component {
  props: Props;
  state: State = {isTransitioning: false, needsSetup: false};
  sidebarContainer: ?HTMLElement;
  handleTransitionEnd: () => void = this.handleTransitionEnd.bind(this);
  handleSidebarDismiss: () => void = this.handleSidebarDismiss.bind(this);
  setSidebarContainerRef: (node: ?HTMLElement) => void = this.setSidebarContainerRef.bind(this);

  handleTransitionEnd() {
    this.setState({isTransitioning: false});
  }

  handleSidebarDismiss() {
    if (this.props.onSidebarDismiss != null) {
      this.props.onSidebarDismiss();
    }
  }

  setSidebarContainerRef(node: ?HTMLElement) {
    this.sidebarContainer = node;
  }

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
    const {children, sidebar, showSidebar} = this.props;
    const className = classNames(
      styles.Sidebar,
      !needsSetup && showSidebar && styles.isShowing,
      isTransitioning && styles.isTransitioning,
    );

    const sidebarElement = sidebar && (
      <div
        className={className}
        ref={this.setSidebarContainerRef}
      >
        {sidebar}
      </div>
    );

    return (
      <div className={styles.Frame}>
        {sidebarElement}

        <div
          className={classNames(styles.SidebarOverlay, showSidebar && styles.isCovering)}
          onClick={this.handleSidebarDismiss}
        />

        <div className={styles.Main}>
          {children}
        </div>
      </div>
    );
  }
}
