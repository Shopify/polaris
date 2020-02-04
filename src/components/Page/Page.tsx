import React from 'react';
import {
  Button as AppBridgeButton,
  TitleBar as AppBridgeTitleBar,
} from '@shopify/app-bridge/actions';
import isEqual from 'lodash/isEqual';

import {classNames} from '../../utilities/css';
import {
  transformActions,
  generateRedirect,
} from '../../utilities/app-bridge-transformers';
import {pick} from '../../utilities/pick';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../utilities/with-app-provider';

import {Header, HeaderProps} from './components';
import styles from './Page.scss';

export interface PageProps extends HeaderProps {
  /** The contents of the page */
  children?: React.ReactNode;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
  /**
   * Force render in page and do not delegate to the app bridge TitleBar action
   * @default false
   * @embeddedAppOnly
   * @see {@link https://polaris.shopify.com/components/structure/page#section-use-in-an-embedded-application|Shopify Page Component docs}
   * */
  forceRender?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts
   * @deprecated As of release 4.0, replaced by {@link https://polaris.shopify.com/components/structure/page#props-narrow-width}
   */
  singleColumn?: boolean;
}

type ComposedProps = PageProps & WithAppProviderProps;

const APP_BRIDGE_PROPS: (keyof PageProps)[] = [
  'title',
  'breadcrumbs',
  'secondaryActions',
  'actionGroups',
  'primaryAction',
];

class PageInner extends React.PureComponent<ComposedProps, never> {
  private titlebar: AppBridgeTitleBar.TitleBar | undefined;

  componentDidMount() {
    if (this.delegateToAppbridge() === false || !this.props.polaris.appBridge) {
      return;
    }

    const transformedProps = this.transformProps();
    if (!transformedProps) return;

    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: Using `Page` to render an embedded app title bar is deprecated and will be removed in v5.0. Use `TitleBar` from `@shopify/app-bridge-react` instead: https://help.shopify.com/en/api/embedded-apps/app-bridge/react-components/titlebar',
    );

    this.titlebar = AppBridgeTitleBar.create(
      this.props.polaris.appBridge,
      transformedProps,
    );
  }

  componentDidUpdate(prevProps: ComposedProps) {
    if (this.titlebar == null || this.delegateToAppbridge() === false) {
      return;
    }

    const prevAppBridgeProps = pick(prevProps, APP_BRIDGE_PROPS);
    const currentAppBridgeProps = pick(this.props, APP_BRIDGE_PROPS);

    if (!isEqual(prevAppBridgeProps, currentAppBridgeProps)) {
      const transformedProps = this.transformProps();
      if (!transformedProps) return;

      this.titlebar.unsubscribe();
      this.titlebar.set(transformedProps);
    }
  }

  componentWillUnmount() {
    if (this.titlebar == null || this.delegateToAppbridge() === false) {
      return;
    }

    this.titlebar.unsubscribe();
  }

  render() {
    const {
      children,
      fullWidth,
      narrowWidth,
      singleColumn,
      ...rest
    } = this.props;

    if (singleColumn) {
      // eslint-disable-next-line no-console
      console.warn(
        'Deprecation: The singleColumn prop has been renamed to narrowWidth to better represents its use and will be removed in v5.0.',
      );
    }

    const className = classNames(
      styles.Page,
      fullWidth && styles.fullWidth,
      (narrowWidth || singleColumn) && styles.narrowWidth,
    );

    const headerMarkup =
      this.delegateToAppbridge() || this.hasHeaderContent() === false ? null : (
        <Header {...rest} />
      );

    return (
      <div className={className}>
        {headerMarkup}
        <div className={styles.Content}>{children}</div>
      </div>
    );
  }

  private delegateToAppbridge(): boolean {
    const {
      polaris: {appBridge},
      forceRender = false,
    } = this.props;

    return appBridge != null && forceRender === false;
  }

  private hasHeaderContent(): boolean {
    const {
      title,
      primaryAction,
      secondaryActions,
      actionGroups,
      breadcrumbs,
    } = this.props;

    return (
      (title != null && title !== '') ||
      primaryAction != null ||
      (secondaryActions != null && secondaryActions.length > 0) ||
      (actionGroups != null && actionGroups.length > 0) ||
      (breadcrumbs != null && breadcrumbs.length > 0)
    );
  }

  private transformProps(): AppBridgeTitleBar.Options | void {
    const {appBridge} = this.props.polaris;
    if (!appBridge) return;
    const {title, primaryAction, secondaryActions, actionGroups} = this.props;

    return {
      title,
      buttons: transformActions(appBridge, {
        primaryAction,
        secondaryActions,
        actionGroups,
      }),
      breadcrumbs: this.transformBreadcrumbs(),
    };
  }

  private transformBreadcrumbs(): AppBridgeButton.Button | undefined {
    const {appBridge} = this.props.polaris;
    if (!appBridge) return;
    const {breadcrumbs} = this.props;

    if (breadcrumbs != null && breadcrumbs.length > 0) {
      const breadcrumb = breadcrumbs[breadcrumbs.length - 1];
      const button = AppBridgeButton.create(appBridge, {
        label: breadcrumb.content || '',
      });

      const callback = !('url' in breadcrumb)
        ? breadcrumb.onAction
        : generateRedirect(appBridge, breadcrumb.url, breadcrumb.target);

      if (callback != null) {
        button.subscribe(AppBridgeButton.Action.CLICK, callback);
      }

      return button;
    } else {
      return undefined;
    }
  }
}

export const Page = withAppProvider<PageProps>()(PageInner);
