import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {MobileCancelMajorMonotone} from '@shopify/polaris-icons';
import {durationSlow} from '@shopify/polaris-tokens';
import {CSSTransition} from '@material-ui/react-transition-group';
import {classNames} from '../../utilities/css';
import {Icon} from '../Icon';
import {Backdrop} from '../Backdrop';
import {TrapFocus} from '../TrapFocus';
import {dataPolarisTopBar, layer} from '../shared';
import {useForcibleToggle} from '../../utilities/use-toggle';
import {setRootProperty} from '../../utilities/set-root-property';
import {useI18n} from '../../utilities/i18n';
import {useMediaQuery} from '../../utilities/media-query';
import {EventListener} from '../EventListener';
import {
  FrameContext,
  ContextualSaveBarProps,
  ToastID,
  ToastPropsWithID,
} from '../../utilities/frame';
import {
  ToastManager,
  Loading,
  ContextualSaveBar,
  CSSAnimation,
  AnimationType,
} from './components';

import styles from './Frame.scss';

export interface FrameProps {
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

export const GLOBAL_RIBBON_CUSTOM_PROPERTY = '--global-ribbon-height';

export const APP_FRAME_MAIN = 'AppFrameMain';

export const APP_FRAME_MAIN_ANCHOR_TARGET = 'AppFrameMainContent';

const APP_FRAME_NAV = 'AppFrameNav';
const APP_FRAME_TOP_BAR = 'AppFrameTopBar';
const APP_FRAME_LOADING_BAR = 'AppFrameLoadingBar';

export function Frame({
  children,
  navigation,
  topBar,
  globalRibbon,
  onNavigationDismiss,
  skipToContentTarget,
  showMobileNavigation = false,
}: FrameProps) {
  const i18n = useI18n();
  const {isNavigationCollapsed} = useMediaQuery();

  const globalRibbonContainer = useRef<HTMLDivElement | null>(null);
  const navigationNode = useRef<HTMLDivElement | null>(null);
  const skipToMainContentTargetNode = useRef<HTMLAnchorElement | null>(null);

  const [, setGlobalRibbonHeight] = useState(0);
  const [loadingStack, setLoadingStack] = useState(0);
  const [toastMessages, setToastMessages] = useState<ToastPropsWithID[]>([]);
  const [
    skipFocused,
    {forceTrue: forceTrueSkipFocused, forceFalse: forceFalseSkipFocused},
  ] = useForcibleToggle(false);
  const [
    showContextualSaveBar,
    {
      forceTrue: forceTrueShowContextualSaveBar,
      forceFalse: forceFalseShowContextualSaveBar,
    },
  ] = useForcibleToggle(false);
  const [
    contextualSaveBarProps,
    setContextualSaveBarProps,
  ] = useState<ContextualSaveBarProps | null>(null);

  const findNavigationNode = useCallback(() => navigationNode.current, []);

  const handleNavigationDismiss = useCallback(() => {
    if (onNavigationDismiss != null) {
      onNavigationDismiss();
    }
  }, [onNavigationDismiss]);

  const handleNavKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const {key} = event;

      if (key === 'Escape') {
        handleNavigationDismiss();
      }
    },
    [handleNavigationDismiss],
  );

  const handleClick = useCallback(() => {
    if (skipToContentTarget && skipToContentTarget.current) {
      skipToContentTarget.current.focus();
    } else if (skipToMainContentTargetNode.current) {
      skipToMainContentTargetNode.current.focus();
    }
  }, [skipToContentTarget]);

  const showToast = useCallback((toast: ToastPropsWithID) => {
    setToastMessages((toastMessages) => {
      const hasToastById = Boolean(
        toastMessages.find(({id}) => id === toast.id),
      );

      return hasToastById ? toastMessages : [...toastMessages, toast];
    });
  }, []);

  const hideToast = useCallback(({id}: ToastID) => {
    setToastMessages((toastMessages) =>
      toastMessages.filter(({id: toastId}) => id !== toastId),
    );
  }, []);

  const startLoading = useCallback(() => {
    setLoadingStack((loadingStack) => loadingStack + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingStack((loadingStack) => Math.max(0, loadingStack - 1));
  }, []);

  const setContextualSaveBar = useCallback(
    (props: ContextualSaveBarProps) => {
      setContextualSaveBarProps({...props});
      forceTrueShowContextualSaveBar();
    },
    [forceTrueShowContextualSaveBar],
  );

  const removeContextualSaveBar = useCallback(() => {
    setContextualSaveBarProps(null);
    forceFalseShowContextualSaveBar();
  }, [forceFalseShowContextualSaveBar]);

  const handleResize = useCallback(() => {
    if (globalRibbonContainer.current) {
      const globalRibbonHeight = globalRibbonContainer.current.offsetHeight;
      setRootProperty(
        GLOBAL_RIBBON_CUSTOM_PROPERTY,
        `${globalRibbonHeight}px`,
        null,
      );
      setGlobalRibbonHeight(globalRibbonHeight);
    }
  }, []);

  useEffect(() => {
    handleResize();
  }, [globalRibbon, handleResize]);

  const context = useMemo(
    () => ({
      showToast,
      hideToast,
      startLoading,
      stopLoading,
      setContextualSaveBar,
      removeContextualSaveBar,
    }),
    [
      hideToast,
      removeContextualSaveBar,
      setContextualSaveBar,
      showToast,
      startLoading,
      stopLoading,
    ],
  );

  const navClassName = classNames(
    styles.Navigation,
    showMobileNavigation && styles['Navigation-visible'],
  );

  const skipTarget = skipToContentTarget
    ? (skipToContentTarget.current && skipToContentTarget.current.id) || ''
    : APP_FRAME_MAIN_ANCHOR_TARGET;

  const mobileNavHidden = isNavigationCollapsed && !showMobileNavigation;
  const mobileNavShowing = isNavigationCollapsed && showMobileNavigation;
  const tabIndex = mobileNavShowing ? 0 : -1;

  const navigationMarkup = navigation ? (
    <TrapFocus trapping={mobileNavShowing}>
      <CSSTransition
        findDOMNode={findNavigationNode}
        appear={isNavigationCollapsed}
        exit={isNavigationCollapsed}
        in={showMobileNavigation}
        timeout={durationSlow}
        classNames={navTransitionClasses}
      >
        <div
          ref={navigationNode}
          className={navClassName}
          onKeyDown={handleNavKeydown}
          id={APP_FRAME_NAV}
          key="NavContent"
          hidden={mobileNavHidden}
        >
          {navigation}
          <button
            type="button"
            className={styles.NavigationDismiss}
            onClick={handleNavigationDismiss}
            aria-hidden={
              mobileNavHidden ||
              (!isNavigationCollapsed && !showMobileNavigation)
            }
            aria-label={i18n.translate(
              'Polaris.Frame.Navigation.closeMobileNavigationLabel',
            )}
            tabIndex={tabIndex}
          >
            <Icon source={MobileCancelMajorMonotone} color="white" />
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
      type={AnimationType.Fade}
    >
      <ContextualSaveBar {...contextualSaveBarProps} />
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
    <div className={styles.GlobalRibbonContainer} ref={globalRibbonContainer}>
      {globalRibbon}
    </div>
  ) : null;

  const skipClassName = classNames(styles.Skip, skipFocused && styles.focused);

  const skipMarkup = (
    <div className={skipClassName}>
      <a
        href={`#${skipTarget}`}
        onFocus={forceTrueSkipFocused}
        onBlur={forceFalseSkipFocused}
        onClick={handleClick}
        className={styles.SkipAnchor}
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
        onClick={handleNavigationDismiss}
        onTouchStart={handleNavigationDismiss}
      />
    ) : null;

  const skipToMainContentTarget = skipToContentTarget ? null : (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      id={APP_FRAME_MAIN_ANCHOR_TARGET}
      ref={skipToMainContentTargetNode}
      tabIndex={-1}
    />
  );

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
          {skipToMainContentTarget}
          <div className={styles.Content}>{children}</div>
        </main>
        <ToastManager toastMessages={toastMessages} />
        {globalRibbonMarkup}
        <EventListener event="resize" handler={handleResize} />
      </div>
    </FrameContext.Provider>
  );
}

const navTransitionClasses = {
  enter: classNames(styles['Navigation-enter']),
  enterActive: classNames(styles['Navigation-enterActive']),
  enterDone: classNames(styles['Navigation-enterActive']),
  exit: classNames(styles['Navigation-exit']),
  exitActive: classNames(styles['Navigation-exitActive']),
};
