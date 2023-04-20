import React, {PureComponent, createRef} from 'react';
import type {MouseEvent} from 'react';
import {MobileCancelMajor} from '@shopify/polaris-icons';
import {CSSTransition} from 'react-transition-group';
import {motion} from '@shopify/polaris-tokens';

import {useI18n} from '../../utilities/i18n';
import {useMediaQuery} from '../../utilities/media-query';
import {classNames} from '../../utilities/css';
import type {Logo} from '../../utilities/frame/types';
import {Icon} from '../Icon';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../EventListener';
import {Backdrop} from '../Backdrop';
import {TrapFocus} from '../TrapFocus';
import {dataPolarisTopBar, layer} from '../shared';
import {setRootProperty} from '../../utilities/set-root-property';
import {FrameContext} from '../../utilities/frame';
import type {
  ContextualSaveBarProps,
  ToastID,
  ToastPropsWithID,
} from '../../utilities/frame';

import {
  ToastManager,
  Loading,
  ContextualSaveBar,
  CSSAnimation,
} from './components';
import styles from './Frame.scss';

export interface FrameProps {
  /** Sets the logo for the TopBar, Navigation, and ContextualSaveBar components */
  logo?: Logo;
  /** A horizontal offset that pushes the frame to the right, leaving empty space on the left */
  offset?: string;
  /** The content to display inside the frame. */
  children?: React.ReactNode;
  /** Accepts a top bar component that will be rendered at the top-most portion of an application frame */
  topBar?: React.ReactNode;
  /** Accepts a navigation component that will be rendered in the left sidebar of an application frame */
  navigation?: React.ReactNode;
  /** Accepts a global ribbon component that will be rendered fixed to the bottom of an application frame */
  globalRibbon?: React.ReactNode;
  /** A boolean property indicating whether the mobile navigation is currently visible
   * @default false
   */
  showMobileNavigation?: boolean;
  /** Accepts a ref to the html anchor element you wish to focus when clicking the skip to content link */
  skipToContentTarget?: React.RefObject<HTMLAnchorElement>;
  /** A callback function to handle clicking the mobile navigation dismiss button */
  onNavigationDismiss?(): void;
}

type CombinedProps = FrameProps & {
  i18n: ReturnType<typeof useI18n>;
  mediaQuery: ReturnType<typeof useMediaQuery>;
};

interface State {
  skipFocused?: boolean;
  globalRibbonHeight: number;
  loadingStack: number;
  toastMessages: ToastPropsWithID[];
  showContextualSaveBar: boolean;
}

const APP_FRAME_MAIN = 'AppFrameMain';
const APP_FRAME_NAV = 'AppFrameNav';
const APP_FRAME_TOP_BAR = 'AppFrameTopBar';
const APP_FRAME_LOADING_BAR = 'AppFrameLoadingBar';

class FrameInner extends PureComponent<CombinedProps, State> {
  state: State = {
    skipFocused: false,
    globalRibbonHeight: 0,
    loadingStack: 0,
    toastMessages: [],
    showContextualSaveBar: false,
  };

  private contextualSaveBar: ContextualSaveBarProps | null = null;
  private globalRibbonContainer: HTMLDivElement | null = null;
  private navigationNode = createRef<HTMLDivElement>();

  componentDidMount() {
    this.handleResize();
    if (this.props.globalRibbon) {
      return;
    }
    this.setGlobalRibbonRootProperty();
    this.setOffset();
  }

  componentDidUpdate(prevProps: FrameProps) {
    if (this.props.globalRibbon !== prevProps.globalRibbon) {
      this.setGlobalRibbonHeight();
    }
    this.setOffset();
  }

  render() {
    const {skipFocused, loadingStack, toastMessages, showContextualSaveBar} =
      this.state;
    const {
      logo,
      children,
      navigation,
      topBar,
      globalRibbon,
      showMobileNavigation = false,
      skipToContentTarget,
      i18n,
      mediaQuery: {isNavigationCollapsed},
    } = this.props;
    const navClassName = classNames(
      styles.Navigation,
      showMobileNavigation && styles['Navigation-visible'],
    );

    const mobileNavHidden = isNavigationCollapsed && !showMobileNavigation;
    const mobileNavShowing = isNavigationCollapsed && showMobileNavigation;
    const tabIndex = mobileNavShowing ? 0 : -1;

    const mobileNavAttributes = {
      ...(mobileNavShowing && {
        'aria-modal': true,
        role: 'dialog',
      }),
    };

    const navigationMarkup = navigation ? (
      <TrapFocus trapping={mobileNavShowing}>
        <CSSTransition
          nodeRef={this.navigationNode}
          appear={isNavigationCollapsed}
          exit={isNavigationCollapsed}
          in={showMobileNavigation}
          timeout={parseInt(motion['duration-300'], 10)}
          classNames={navTransitionClasses}
        >
          <div
            key="NavContent"
            {...mobileNavAttributes}
            aria-label={i18n.translate('Polaris.Frame.navigationLabel')}
            ref={this.navigationNode}
            className={navClassName}
            onKeyDown={this.handleNavKeydown}
            id={APP_FRAME_NAV}
            hidden={mobileNavHidden}
          >
            {navigation}
            <button
              type="button"
              className={styles.NavigationDismiss}
              onClick={this.handleNavigationDismiss}
              aria-hidden={
                mobileNavHidden ||
                (!isNavigationCollapsed && !showMobileNavigation)
              }
              aria-label={i18n.translate(
                'Polaris.Frame.Navigation.closeMobileNavigationLabel',
              )}
              tabIndex={tabIndex}
            >
              <Icon source={MobileCancelMajor} />
            </button>
          </div>
        </CSSTransition>
      </TrapFocus>
    ) : null;

    const loadingMarkup =
      loadingStack > 0 ? (
        <div className={styles.LoadingBar} id={APP_FRAME_LOADING_BAR}>
          <Loading />
        </div>
      ) : null;

    const contextualSaveBarMarkup = (
      <CSSAnimation
        in={showContextualSaveBar}
        className={styles.ContextualSaveBar}
        type="fade"
      >
        <ContextualSaveBar {...this.contextualSaveBar} />
      </CSSAnimation>
    );

    const topBarMarkup = topBar ? (
      <div
        className={styles.TopBar}
        {...layer.props}
        {...dataPolarisTopBar.props}
        id={APP_FRAME_TOP_BAR}
      >
        {topBar}
      </div>
    ) : null;

    const globalRibbonMarkup = globalRibbon ? (
      <div
        className={styles.GlobalRibbonContainer}
        ref={this.setGlobalRibbonContainer}
      >
        {globalRibbon}
      </div>
    ) : null;

    const skipClassName = classNames(
      styles.Skip,
      skipFocused && styles.focused,
    );

    const skipTarget = skipToContentTarget?.current
      ? skipToContentTarget.current.id
      : APP_FRAME_MAIN;

    const skipMarkup = (
      <div className={skipClassName}>
        <a
          href={`#${skipTarget}`}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
        >
          {i18n.translate('Polaris.Frame.skipToContent')}
        </a>
      </div>
    );

    const navigationAttributes = navigation
      ? {
          'data-has-navigation': true,
        }
      : {};

    const frameClassName = classNames(
      styles.Frame,
      navigation && styles.hasNav,
      topBar && styles.hasTopBar,
    );

    const navigationOverlayMarkup =
      showMobileNavigation && isNavigationCollapsed ? (
        <Backdrop
          belowNavigation
          onClick={this.handleNavigationDismiss}
          onTouchStart={this.handleNavigationDismiss}
        />
      ) : null;

    // This is probably a legit error but I don't have the time to refactor this
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const context = {
      logo,
      showToast: this.showToast,
      hideToast: this.hideToast,
      startLoading: this.startLoading,
      stopLoading: this.stopLoading,
      setContextualSaveBar: this.setContextualSaveBar,
      removeContextualSaveBar: this.removeContextualSaveBar,
    };

    return (
      <FrameContext.Provider value={context}>
        <div
          className={frameClassName}
          {...layer.props}
          {...navigationAttributes}
        >
          {skipMarkup}
          {topBarMarkup}
          {navigationMarkup}
          {contextualSaveBarMarkup}
          {loadingMarkup}
          {navigationOverlayMarkup}
          <main
            className={styles.Main}
            id={APP_FRAME_MAIN}
            data-has-global-ribbon={Boolean(globalRibbon)}
          >
            <div className={styles.Content}>{children}</div>
          </main>
          <ToastManager toastMessages={toastMessages} />
          {globalRibbonMarkup}
          <EventListener event="resize" handler={this.handleResize} />
        </div>
      </FrameContext.Provider>
    );
  }

  private setGlobalRibbonHeight = () => {
    const {globalRibbonContainer} = this;
    if (globalRibbonContainer) {
      this.setState(
        {
          globalRibbonHeight: globalRibbonContainer.offsetHeight,
        },
        this.setGlobalRibbonRootProperty,
      );
    }
  };

  private setOffset = () => {
    const {offset = '0px'} = this.props;
    setRootProperty('--pc-frame-offset', offset);
  };

  private setGlobalRibbonRootProperty = () => {
    const {globalRibbonHeight} = this.state;
    setRootProperty(
      '--pc-frame-global-ribbon-height',
      `${globalRibbonHeight}px`,
    );
  };

  private showToast = (toast: ToastPropsWithID) => {
    this.setState(({toastMessages}: State) => {
      const hasToastById =
        toastMessages.find(({id}) => id === toast.id) != null;
      return {
        toastMessages: hasToastById ? toastMessages : [...toastMessages, toast],
      };
    });
  };

  private hideToast = ({id}: ToastID) => {
    this.setState(({toastMessages}: State) => {
      return {
        toastMessages: toastMessages.filter(({id: toastId}) => id !== toastId),
      };
    });
  };

  private setContextualSaveBar = (props: ContextualSaveBarProps) => {
    const {showContextualSaveBar} = this.state;
    this.contextualSaveBar = {...props};
    if (showContextualSaveBar === true) {
      this.forceUpdate();
    } else {
      this.setState({showContextualSaveBar: true});
    }
  };

  private removeContextualSaveBar = () => {
    this.contextualSaveBar = null;
    this.setState({showContextualSaveBar: false});
  };

  private startLoading = () => {
    this.setState(({loadingStack}: State) => ({
      loadingStack: loadingStack + 1,
    }));
  };

  private stopLoading = () => {
    this.setState(({loadingStack}: State) => ({
      loadingStack: Math.max(0, loadingStack - 1),
    }));
  };

  private handleResize = () => {
    if (this.props.globalRibbon) {
      this.setGlobalRibbonHeight();
    }
  };

  private handleFocus = () => {
    this.setState({skipFocused: true});
  };

  private handleBlur = () => {
    this.setState({skipFocused: false});
  };

  private handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const {skipToContentTarget} = this.props;
    if (skipToContentTarget && skipToContentTarget.current) {
      skipToContentTarget.current.focus();
      event?.preventDefault();
    }
  };

  private handleNavigationDismiss = () => {
    const {onNavigationDismiss} = this.props;
    if (onNavigationDismiss != null) {
      onNavigationDismiss();
    }
  };

  private setGlobalRibbonContainer = (node: HTMLDivElement) => {
    this.globalRibbonContainer = node;
  };

  private handleNavKeydown = (event: React.KeyboardEvent<HTMLElement>) => {
    const {key} = event;
    const {
      mediaQuery: {isNavigationCollapsed},
      showMobileNavigation,
    } = this.props;

    const mobileNavShowing = isNavigationCollapsed && showMobileNavigation;
    if (mobileNavShowing && key === 'Escape') {
      this.handleNavigationDismiss();
    }
  };
}

const navTransitionClasses = {
  enter: classNames(styles['Navigation-enter']),
  enterActive: classNames(styles['Navigation-enterActive']),
  enterDone: classNames(styles['Navigation-enterActive']),
  exit: classNames(styles['Navigation-exit']),
  exitActive: classNames(styles['Navigation-exitActive']),
};

export function Frame(props: FrameProps) {
  const i18n = useI18n();
  const mediaQuery = useMediaQuery();

  return <FrameInner {...props} i18n={i18n} mediaQuery={mediaQuery} />;
}
