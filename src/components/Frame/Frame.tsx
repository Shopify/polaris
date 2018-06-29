import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {navBarCollapsed} from '../../utilities/breakpoints';
import {Button, Icon, EventListener} from '../../components';
import {TrapFocus} from '../Focus';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';

import {ToastDescriptor, FrameContext, frameContextTypes} from '../types';

import {
  ToastManager,
  Loading,
  ContextualSaveBar,
  ContextualSaveBarProps,
} from './components';
import * as styles from './Frame.scss';

export interface Props {
  topBar?: React.ReactNode;
  nav?: React.ReactNode;
  banners?: React.ReactNode;
  showMobileNav?: boolean;
  onNavDismiss?(): void;
}

export interface State {
  navAnimating?: boolean;
  skipFocused?: boolean;
  bannerHeight: number;
  loadingStack: number;
  toastMessages: (ToastDescriptor & {id: string})[];
  contextualSaveBar: ContextualSaveBarProps | null;
}

export const APP_FRAME_MAIN = 'AppFrameMain';

export type CombinedProps = Props & WithAppProviderProps;

export class Frame extends React.PureComponent<CombinedProps, State> {
  static childContextTypes = frameContextTypes;

  state: State = {
    navAnimating: false,
    skipFocused: false,
    bannerHeight: 0,
    loadingStack: 0,
    toastMessages: [],
    contextualSaveBar: null,
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
        setContextualSaveBar: this.setContextualSaveBar,
        removeContextualSaveBar: this.removeContextualSaveBar,
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
      contextualSaveBar,
    } = this.state;
    const {
      children,
      nav,
      topBar,
      banners,
      showMobileNav,
      polaris: {intl},
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

    const contextualSaveBarClassName = classNames(
      styles.ContextualSaveBar,
      contextualSaveBar && styles['ContextualSaveBar-visible'],
    );

    const contextualSaveBarMarkup = contextualSaveBar && (
      <div className={contextualSaveBarClassName}>
        <ContextualSaveBar {...contextualSaveBar} />
      </div>
    );

    const topBarMarkup = topBar ? (
      <div className={styles.TopBar} data-polaris-layer>
        {topBar}
      </div>
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

    const skipMarkup = (
      <div className={skipClassName}>
        <Button
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          {intl.translate('Polaris.Frame.skipToContent')}
        </Button>
      </div>
    );

    return (
      <div className={styles.Frame} data-polaris-layer>
        {skipMarkup}
        {topBarMarkup}
        {contextualSaveBarMarkup}
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
  private setContextualSaveBar(props: ContextualSaveBarProps) {
    this.setState({contextualSaveBar: {...props}});
  }

  @autobind
  private removeContextualSaveBar() {
    this.setState({contextualSaveBar: null});
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

export default withAppProvider<Props>()(Frame);
