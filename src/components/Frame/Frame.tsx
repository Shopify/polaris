import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {navigationBarCollapsed} from '../../utilities/breakpoints';
import {Button, Icon, EventListener, Sticky} from '../../components';
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
  /** Accepts a top bar component that will be rendered at the top-most portion of an application frame */
  topBar?: React.ReactNode;
  /** Accepts a navigation component that will be rendered in the left sidebar of an application frame */
  navigation?: React.ReactNode;
  /** Accepts a global ribbon component that will be rendered fixed to the bottom of an application frame */
  globalRibbon?: React.ReactNode;
  /** A boolean property indicating whether the mobile navigation is currently visible */
  showMobileNavigation?: boolean;
  /** A callback function to handle clicking the mobile navigation dismiss button */
  onNavigationDismiss?(): void;
}

export interface State {
  navigationAnimating?: boolean;
  navigationCollapsed?: boolean;
  skipFocused?: boolean;
  bannerHeight: number;
  loadingStack: number;
  toastMessages: (ToastDescriptor & {id: string})[];
  contextualSaveBar: ContextualSaveBarProps | null;
}

export const APP_FRAME_MAIN = 'AppFrameMain';
const APP_FRAME_NAV = 'AppFrameNav';
const APP_FRAME_TOP_BAR = 'AppFrameTopBar';
const APP_FRAME_LOADING_BAR = 'AppFrameLoadingBar';

export type CombinedProps = Props & WithAppProviderProps;

export class Frame extends React.PureComponent<CombinedProps, State> {
  static childContextTypes = frameContextTypes;

  state: State = {
    navigationAnimating: false,
    navigationCollapsed: false,
    skipFocused: false,
    bannerHeight: 0,
    loadingStack: 0,
    toastMessages: [],
    contextualSaveBar: null,
  };

  private navigationContainer: HTMLElement | null = null;
  private bannerContainer: HTMLDivElement | null = null;

  getChildContext(): FrameContext {
    return {
      frame: {
        showToast: this.showToast,
        hideToast: this.hideToast,
        startLoading: this.startLoading,
        stopLoading: this.stopLoading,
        setContextualSaveBar: this.setContextualSaveBar,
        removeContextualSaveBar: this.removeContextualSaveBar,
      },
    };
  }

  componentWillReceiveProps(newProps: Props) {
    const {bannerContainer} = this;

    if (newProps.showMobileNavigation !== this.props.showMobileNavigation) {
      this.setState({navigationAnimating: true});
    }

    if (bannerContainer) {
      this.setState({
        bannerHeight: bannerContainer.offsetHeight,
      });
    }
  }

  componentDidMount() {
    const {navigationContainer} = this;

    if (navigationBarCollapsed().matches) {
      this.setState({navigationCollapsed: true});
    }

    if (navigationContainer == null) {
      return;
    }

    navigationContainer.addEventListener(
      'transitionend',
      this.handleTransitionEnd,
    );
  }

  componentWillUnmount() {
    if (this.navigationContainer == null) {
      return;
    }

    this.navigationContainer.removeEventListener(
      'transitionend',
      this.handleTransitionEnd,
    );
  }

  render() {
    const {
      navigationAnimating,
      navigationCollapsed,
      skipFocused,
      bannerHeight,
      loadingStack,
      toastMessages,
      contextualSaveBar,
    } = this.state;
    const {
      children,
      navigation,
      topBar,
      globalRibbon,
      showMobileNavigation,
      polaris: {intl},
    } = this.props;

    const className = classNames(
      styles.Navigation,
      showMobileNavigation && styles['Navigation-visible'],
      navigationAnimating && styles['Navigation-animating'],
    );

    const tabIndex = showMobileNavigation && navigationCollapsed ? 0 : -1;
    const contentStyles = {paddingBottom: `${bannerHeight}px`};

    const navigationMarkup = navigation ? (
      <div
        className={className}
        ref={this.setNavigationContainerRef}
        aria-hidden={!showMobileNavigation && navigationCollapsed}
        onKeyDown={this.handleNavKeydown}
        id={APP_FRAME_NAV}
      >
        {navigation}
        <button
          type="button"
          className={styles.NavigationDismiss}
          onClick={this.handleNavigationDismiss}
          aria-hidden={!showMobileNavigation && navigationCollapsed}
          aria-label={intl.translate(
            'Polaris.Frame.Navigation.closeMobileNavigationLabel',
          )}
          tabIndex={tabIndex}
        >
          <Icon source="cancel" color="white" />
        </button>
      </div>
    ) : null;

    const loadingMarkup =
      loadingStack > 0 ? (
        <div className={styles.LoadingBar} id={APP_FRAME_LOADING_BAR}>
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
      <div className={styles.TopBar} data-polaris-layer id={APP_FRAME_TOP_BAR}>
        <Sticky>{topBar}</Sticky>
      </div>
    ) : null;

    const bannerMarkup = globalRibbon ? (
      <div
        className={styles.Banners}
        testID="FrameBannerContainer"
        ref={this.setBannerContainer}
      >
        {globalRibbon}
      </div>
    ) : null;

    const navigationOverlayClassName = classNames(
      styles.NavigationOverlay,
      showMobileNavigation && styles['NavigationOverlay-covering'],
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

    const navigationAttributes = navigation
      ? {
          'data-has-navigation': true,
        }
      : {};

    return (
      <div
        className={styles.Frame}
        data-polaris-layer
        {...navigationAttributes}
      >
        {skipMarkup}
        {topBarMarkup}
        {contextualSaveBarMarkup}
        {loadingMarkup}
        <div
          className={navigationOverlayClassName}
          onClick={this.handleNavigationDismiss}
          onTouchStart={this.handleNavigationDismiss}
        />
        <TrapFocus trapping={showMobileNavigation && navigationCollapsed}>
          {navigationMarkup}
        </TrapFocus>
        <main
          className={styles.Main}
          id={APP_FRAME_MAIN}
          data-has-banner={Boolean(globalRibbon)}
        >
          <div style={contentStyles} testID="FrameContentStyles">
            {children}
          </div>
        </main>
        <ToastManager toastMessages={toastMessages} />
        {bannerMarkup}
        <EventListener event="resize" handler={this.handleResize} />
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
  private handleResize() {
    const {navigationCollapsed} = this.state;

    if (navigationBarCollapsed().matches !== navigationCollapsed) {
      this.setState({navigationCollapsed: !navigationCollapsed});
    }

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
      this.setState({navigationAnimating: false});
    }, 100);
  }

  @autobind
  private handleNavigationDismiss() {
    if (this.props.onNavigationDismiss != null) {
      this.props.onNavigationDismiss();
    }
  }

  @autobind
  private setBannerContainer(node: HTMLDivElement) {
    this.bannerContainer = node;
  }

  @autobind
  private setNavigationContainerRef(node: HTMLDivElement) {
    this.navigationContainer = node;
  }

  @autobind
  private handleNavKeydown(event: React.KeyboardEvent<HTMLElement>) {
    const {key} = event;

    if (key === 'Escape') {
      this.handleNavigationDismiss();
    }
  }
}

function focusAppFrameMain() {
  window.location.assign(`${window.location.pathname}#${APP_FRAME_MAIN}`);
}

export default withAppProvider<Props>()(Frame);
