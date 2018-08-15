import * as React from 'react';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import {classNames} from '@shopify/react-utilities/styles';

import {withAppProvider, WithAppProviderProps} from '../AppProvider';

import {Header} from './components';
import {PageProps} from './types';

import * as styles from './Page.scss';

export interface Props extends PageProps {}

export type ComposedProps = Props & WithAppProviderProps;

const EASDK_PROPS: (keyof Props)[] = [
  'title',
  'icon',
  'breadcrumbs',
  'secondaryActions',
  'actionGroups',
  'primaryAction',
  'pagination',
];

export class Page extends React.PureComponent<ComposedProps, never> {
  componentDidMount() {
    if (this.props.polaris.easdk == null) {
      return;
    }
    this.handleEASDKMessaging();
  }

  componentDidUpdate(prevProps: ComposedProps) {
    if (this.props.polaris.easdk == null) {
      return;
    }

    const prevEASDKProps = pick(prevProps, EASDK_PROPS);
    const currentEASDKProps = pick(this.props, EASDK_PROPS);

    if (!isEqual(prevEASDKProps, currentEASDKProps)) {
      this.handleEASDKMessaging();
    }
  }

  render() {
    const {children, fullWidth, singleColumn, ...rest} = this.props;

    const className = classNames(
      styles.Page,
      fullWidth && styles.fullWidth,
      singleColumn && styles.singleColumn,
    );

    const headerMarkup =
      this.props.polaris.easdk || !this.hasHeaderContent() ? null : (
        <Header {...rest} />
      );

    return (
      <div className={className}>
        {headerMarkup}
        <div className={styles.Content}>{children}</div>
      </div>
    );
  }

  private handleEASDKMessaging() {
    const {easdk} = this.props.polaris;

    if (easdk) {
      easdk.Bar.update(this.props);
    }
  }

  private hasHeaderContent() {
    const {title, primaryAction, secondaryActions, breadcrumbs} = this.props;
    return (
      (title && title !== '') ||
      primaryAction ||
      (secondaryActions && secondaryActions.length > 0) ||
      (breadcrumbs && breadcrumbs.length > 0)
    );
  }
}

export default withAppProvider<Props>()(Page);
