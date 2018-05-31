import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {navBarCollapsed} from '../../utilities/breakpoints';
import Button from '../Button';
import Icon from '../Icon';
import EventListener from '../EventListener';
import TrapFocus from '../Focus/TrapFocus';
import {ToastDescriptor, FrameContext, frameContextTypes} from '../types';
import {ToastManager, Loading} from './components';
import * as styles from './Frame.scss';

export interface Props {
  skipToContent?: string;
  topBar?: React.ReactNode;
  contextBar?: React.ReactNode;
  nav?: React.ReactNode;
  banners?: React.ReactNode;
  showMobileNav?: boolean;
  showContextBar?: boolean;
  onNavDismiss?(): void;
}

export interface State {
  navAnimating?: boolean;
  skipFocused?: boolean;
  bannerHeight: number;
  loadingStack: number;
  toastMessages: (ToastDescriptor & {id: string})[];
}

export const APP_FRAME_MAIN = 'AppFrameMain';

export default class Frame extends React.PureComponent<Props, State> {
  static childContextTypes = frameContextTypes;

  state: State = {
    navAnimating: false,
    skipFocused: false,
    bannerHeight: 0,
    loadingStack: 0,
    toastMessages: [],
  };

  private navContainer: HTMLElement | null = null;
  private bannerContainer: HTMLDivElement | null = null;

  getChildContext(): FrameContext {
    return {
      frame: {
        showToast: this.showToast,
        hideToast: this.hideToast,
        startLoading: this.startLoading,
        resetLoading: this.resetLoading,
        stopLoading: this.stopLoading,
      },
    };
  }

  componentWillReceiveProps(newProps: Props) {
    const {bannerContainer} = this;

    if (newProps.showMobileNav !== this.props.showMobileNav) {
      this.setState({navAnimating: true});
    }

    if (bannerContainer) {
      this.setState({
        bannerHeight: bannerContainer.offsetHeight,
      });
    }
  }

  componentDidMount() {
    const {navContainer} = this;

    if (navContainer == null) {
      return;
    }

    navContainer.addEventListener('transitionend', this.handleTransitionEnd);
    navContainer.addEventListener('keydown', this.handleNavKeydown);
  }

  componentWillUnmount() {
    if (this.navContainer == null) {
      return;
    }
    this.navContainer.removeEventListener(
      'transitionend',
      this.handleTransitionEnd,
    );

    this.navContainer.removeEventListener('keydown', this.handleNavKeydown);
  }

  render() {
    const {
      navAnimating,
      skipFocused,
      bannerHeight,
      loadingStack,
      toastMessages,
    } = this.state;
    const {
      children,
      nav,
      topBar,
      banners,
      contextBar,
      showMobileNav,
      showContextBar,
      skipToContent,
    } = this.props;

    const className = classNames(
      styles.Nav,
      showMobileNav && styles['Nav-visible'],
      navAnimating && styles['Nav-animating'],
    );

    const tabIndex = showMobileNav ? 0 : -1;
    const contentStyles = {paddingBottom: `${bannerHeight}px`};

    const navMarkup = nav ? (
      <div
        className={className}
        ref={this.setNavContainerRef}
        aria-hidden={!showMobileNav}
        tabIndex={tabIndex}
      >
        {nav}
        <button
          type="button"
          className={styles.NavDismiss}
          onClick={this.handleNavDismiss}
          aria-hidden={!showMobileNav}
          tabIndex={tabIndex}
        >
          <Icon source="cancel" color="white" />
        </button>
      </div>
    ) : null;

    const loadingMarkup =
      loadingStack > 0 ? (
        <div className={styles.LoadingBar}>
          <Loading />
        </div>
      ) : null;

    const contextBarClassName = classNames(
      styles.ContextBar,
      showContextBar && styles['ContextBar-visible'],
    );

    const contextBarMarkup = contextBar ? (
      <div className={contextBarClassName}>{contextBar}</div>
    ) : null;

    const topBarMarkup = topBar ? (
      <div className={styles.TopBar}>{topBar}</div>
    ) : null;

    const bannerMarkup = banners ? (
      <div
        className={styles.Banners}
        testID="FrameBannerContainer"
        ref={this.setBannerContainer}
      >
        {banners}
      </div>
    ) : null;

    const bannerSizeMeasureListener = banners ? (
      <EventListener event="resize" handler={this.handleResize} />
    ) : null;

    const navOverlayClassName = classNames(
      styles.NavOverlay,
      showMobileNav && styles['NavOverlay-covering'],
    );

    const skipClassName = classNames(
      styles.Skip,
      skipFocused && styles.focused,
    );

    const skipMarkup = skipToContent ? (
      <div className={skipClassName}>
        <Button
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          {skipToContent}
        </Button>
      </div>
    ) : null;

    return (
      <div className={styles.Frame} data-polaris-layer>
        {skipMarkup}
        {topBarMarkup}
        {contextBarMarkup}
        {loadingMarkup}
        <div
          className={navOverlayClassName}
          onClick={this.handleNavDismiss}
          onTouchStart={this.handleNavDismiss}
        />
        <TrapFocus trapping={showMobileNav}>{navMarkup}</TrapFocus>
        <main
          className={styles.Main}
          id={APP_FRAME_MAIN}
          data-has-banner={Boolean(banners)}
        >
          <div style={contentStyles} testID="FrameContentStyles">
            {children}
          </div>
        </main>
        <ToastManager toastMessages={toastMessages} />
        {bannerMarkup}
        {bannerSizeMeasureListener}
      </div>
    );
  }

  @autobind
  private showToast(toast: {id: string} & ToastDescriptor) {
    this.setState(({toastMessages}: State) => {
      const hasToastById =
        toastMessages.find(({id}) => id === toast.id) != null;
      return {
        toastMessages: hasToastById ? toastMessages : [...toastMessages, toast],
      };
    });
  }

  @autobind
  private hideToast({id}: {id: string}) {
    this.setState(({toastMessages}: State) => {
      return {
        toastMessages: toastMessages.filter(({id: toastId}) => id !== toastId),
      };
    });
  }

  @autobind
  private startLoading() {
    this.setState(({loadingStack}: State) => ({
      loadingStack: loadingStack + 1,
    }));
  }

  @autobind
  private stopLoading() {
    this.setState(({loadingStack}: State) => ({
      loadingStack: Math.max(0, loadingStack - 1),
    }));
  }

  @autobind
  private resetLoading() {
    this.setState({loadingStack: 0});
  }

  @autobind
  private handleResize() {
    const {bannerContainer} = this;

    if (bannerContainer == null) {
      return;
    }

    this.setState({
      bannerHeight: bannerContainer.offsetHeight,
    });
  }

  @autobind
  private handleClick() {
    focusAppFrameMain();
  }

  @autobind
  private handleFocus() {
    this.setState({skipFocused: true});
  }

  @autobind
  private handleBlur() {
    this.setState({skipFocused: false});
  }

  @autobind
  private handleTransitionEnd() {
    setTimeout(() => {
      this.setState({navAnimating: false});
    }, 100);
  }

  @autobind
  private handleNavDismiss() {
    if (this.props.onNavDismiss != null) {
      this.props.onNavDismiss();
    }
  }

  @autobind
  private setBannerContainer(node: HTMLDivElement) {
    this.bannerContainer = node;
  }

  @autobind
  private setNavContainerRef(node: HTMLDivElement) {
    this.navContainer = node;
  }

  @autobind
  private handleNavKeydown() {
    const {showMobileNav} = this.props;

    if (!showMobileNav && navBarCollapsed().matches) {
      focusAppFrameMain();
    }
  }
}

function focusAppFrameMain() {
  window.location.assign(`${window.location.pathname}#${APP_FRAME_MAIN}`);
}
