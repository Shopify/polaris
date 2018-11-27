import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {CSSTransition} from 'react-transition-group';
import {navigationBarCollapsed} from '../../utilities/breakpoints';
import Button from '../Button';
import Icon from '../Icon';
import EventListener from '../EventListener';
import {Props as ToastProps} from '../Toast';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import Backdrop from '../Backdrop';
import TrapFocus from '../TrapFocus';
// eslint-disable-next-line shopify/strict-component-boundaries
import {Provider as UserMenuProvider} from '../TopBar/components/UserMenu/Context';
import {dataPolarisTopBar, layer, Duration} from '../shared';
import {setRootProperty} from '../../utilities/setRootProperty';
import {FrameContext, frameContextTypes} from '../types';
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
  /** A boolean property indicating whether the mobile navigation is currently visible
   * @default false
   */
  showMobileNavigation?: boolean;
  /** A callback function to handle clicking the mobile navigation dismiss button */
  onNavigationDismiss?(): void;
}

export interface State {
  mobileView?: boolean;
  skipFocused?: boolean;
  globalRibbonHeight: number;
  loadingStack: number;
  toastMessages: (ToastProps & {id: string})[];
  showContextualSaveBar: boolean;
}

export const GLOBAL_RIBBON_CUSTOM_PROPERTY = '--global-ribbon-height';
export const APP_FRAME_MAIN = 'AppFrameMain';
const APP_FRAME_NAV = 'AppFrameNav';
const APP_FRAME_TOP_BAR = 'AppFrameTopBar';
const APP_FRAME_LOADING_BAR = 'AppFrameLoadingBar';

export type CombinedProps = Props & WithAppProviderProps;

export class Frame extends React.PureComponent<CombinedProps, State> {
  static childContextTypes = frameContextTypes;

  state: State = {
    skipFocused: false,
    globalRibbonHeight: 0,
    loadingStack: 0,
    toastMessages: [],
    mobileView: isMobileView(),
    showContextualSaveBar: false,
  };

  private contextualSaveBar: ContextualSaveBarProps | null;

  private globalRibbonContainer: HTMLDivElement | null = null;

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

  componentDidMount() {
    this.handleResize();
    if (this.props.globalRibbon) {
      return;
    }
    this.setGlobalRibbonRootProperty();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.globalRibbon !== prevProps.globalRibbon) {
      this.setGlobalRibbonHeight();
    }
  }

  render() {
    const {
      skipFocused,
      loadingStack,
      toastMessages,
      showContextualSaveBar,
      mobileView,
    } = this.state;
    const {
      children,
      navigation,
      topBar,
      globalRibbon,
      showMobileNavigation = false,
      polaris: {intl},
    } = this.props;

    const navClassName = classNames(
      styles.Navigation,
      showMobileNavigation && styles['Navigation-visible'],
    );

    const mobileNavHidden = mobileView && !showMobileNavigation;
    const mobileNavShowing = mobileView && showMobileNavigation;
    const tabIndex = mobileNavShowing ? 0 : -1;

    const navigationMarkup = navigation ? (
      <TrapFocus trapping={mobileNavShowing}>
        <CSSTransition
          appear={mobileView}
          exit={mobileView}
          in={showMobileNavigation}
          timeout={Duration.Base}
          classNames={navTransitionClasses}
        >
          <div
            className={navClassName}
            onKeyDown={this.handleNavKeydown}
            id={APP_FRAME_NAV}
            key="NavContent"
            hidden={mobileNavHidden}
          >
            {navigation}
            <button
              type="button"
              className={styles.NavigationDismiss}
              onClick={this.handleNavigationDismiss}
              aria-hidden={
                mobileNavHidden || (!mobileView && !showMobileNavigation)
              }
              aria-label={intl.translate(
                'Polaris.Frame.Navigation.closeMobileNavigationLabel',
              )}
              tabIndex={tabIndex}
            >
              <Icon source="cancel" color="white" />
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
      <CSSTransition
        appear
        exit
        in={showContextualSaveBar}
        timeout={300}
        classNames={contextualSaveBarTransitionClasses}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.ContextualSaveBar}>
          <ContextualSaveBar {...this.contextualSaveBar} />
        </div>
      </CSSTransition>
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

    const frameClassName = classNames(
      styles.Frame,
      navigation && styles.hasNav,
      topBar && styles.hasTopBar,
    );

    const navigationOverlayMarkup =
      showMobileNavigation && mobileView ? (
        <Backdrop
          belowNavigation
          onClick={this.handleNavigationDismiss}
          onTouchStart={this.handleNavigationDismiss}
        />
      ) : null;

    return (
      <div
        className={frameClassName}
        {...layer.props}
        {...navigationAttributes}
      >
        {skipMarkup}
        <UserMenuProvider mobileView={mobileView || false}>
          {topBarMarkup}
          {contextualSaveBarMarkup}
          {loadingMarkup}
          {navigationOverlayMarkup}
          {navigationMarkup}
        </UserMenuProvider>
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
    );
  }

  @autobind
  private setGlobalRibbonHeight() {
    const {globalRibbonContainer} = this;
    if (globalRibbonContainer) {
      this.setState(
        {
          globalRibbonHeight: globalRibbonContainer.offsetHeight,
        },
        this.setGlobalRibbonRootProperty,
      );
    }
  }

  @autobind
  private setGlobalRibbonRootProperty() {
    const {globalRibbonHeight} = this.state;
    setRootProperty(
      GLOBAL_RIBBON_CUSTOM_PROPERTY,
      `${globalRibbonHeight}px`,
      null,
    );
  }

  @autobind
  private showToast(toast: {id: string} & ToastProps) {
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
    const {showContextualSaveBar} = this.state;
    this.contextualSaveBar = {...props};
    if (showContextualSaveBar === true) {
      this.forceUpdate();
    } else {
      this.setState({showContextualSaveBar: true});
    }
  }

  @autobind
  private removeContextualSaveBar() {
    this.contextualSaveBar = null;
    this.setState({showContextualSaveBar: false});
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
    const {mobileView} = this.state;

    if (isMobileView() && !mobileView) {
      this.setState({mobileView: true});
    } else if (!isMobileView() && mobileView) {
      this.setState({mobileView: false});
    }

    if (this.props.globalRibbon) {
      this.setGlobalRibbonHeight();
    }
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
  private handleNavigationDismiss() {
    const {onNavigationDismiss} = this.props;
    if (onNavigationDismiss != null) {
      onNavigationDismiss();
    }
  }

  @autobind
  private setGlobalRibbonContainer(node: HTMLDivElement) {
    this.globalRibbonContainer = node;
  }

  @autobind
  private handleNavKeydown(event: React.KeyboardEvent<HTMLElement>) {
    const {key} = event;

    if (key === 'Escape') {
      this.handleNavigationDismiss();
    }
  }
}

const navTransitionClasses = {
  enter: classNames(styles['Navigation-enter']),
  enterActive: classNames(styles['Navigation-enterActive']),
  enterDone: classNames(styles['Navigation-enterActive']),
  exit: classNames(styles['Navigation-exit']),
  exitActive: classNames(styles['Navigation-exitActive']),
};

const contextualSaveBarTransitionClasses = {
  enter: classNames(styles['ContextualSaveBar-enter']),
  enterActive: classNames(styles['ContextualSaveBar-enterActive']),
  enterDone: classNames(styles['ContextualSaveBar-enterActive']),
  exit: classNames(styles['ContextualSaveBar-exit']),
  exitActive: classNames(styles['ContextualSaveBar-exitActive']),
};

function focusAppFrameMain() {
  window.location.assign(`${window.location.pathname}#${APP_FRAME_MAIN}`);
}

function isMobileView() {
  return navigationBarCollapsed().matches;
}

export default withAppProvider<Props>()(Frame);
