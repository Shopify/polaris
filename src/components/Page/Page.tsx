import * as React from 'react';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import {classNames} from '@shopify/react-utilities/styles';

import {DisableableAction, ComplexAction} from '../../types';
import {buttonsFrom} from '../Button';
import ButtonGroup from '../ButtonGroup';
import Breadcrumbs, {Props as BreadcrumbProps} from '../Breadcrumbs';
import Pagination, {PaginationDescriptor} from '../Pagination';
import DisplayText from '../DisplayText';

import * as styles from './Page.scss';

export interface Props {
  title: string,
  icon?: string,
  breadcrumbs?: BreadcrumbProps['breadcrumbs'],
  children?: React.ReactNode,
  fullWidth?: boolean,
  secondaryActions?: ComplexAction[],
  primaryAction?: DisableableAction,
  pagination?: PaginationDescriptor,
}

const EASDK_PROPS = [
  'title',
  'icon',
  'breadcrumbs',
  'secondaryActions',
  'primaryAction',
  'pagination',
];

export default class Page extends React.PureComponent<Props, never> {
  static contextTypes = {
    easdk: React.PropTypes.object,
  };

  componentDidMount() {
    if (this.context.easdk == null) { return; }
    this.handleEASDKMessaging();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.context.easdk == null) { return; }

    const prevEASDKProps = pick<{}, Props>(prevProps, EASDK_PROPS);
    const currentEASDKProps = pick<{}, Props>(this.props, EASDK_PROPS);

    if (!isEqual(prevEASDKProps, currentEASDKProps)) {
      this.handleEASDKMessaging();
    }
  }

  render() {
    const {
      icon,
      children,
      title,
      breadcrumbs,
      primaryAction,
      secondaryActions,
      fullWidth,
      pagination,
    } = this.props;

    const className = classNames(
      styles.Page,
      fullWidth && styles.fullWidth,
    );

    if (this.context.easdk) {
      return (
        <div className={className}>
          {children}
        </div>
      );
    }

    const breadcrumbMarkup = breadcrumbs != null && breadcrumbs.length > 0
      ? (
        <div className={styles.Breadcrumbs}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      )
      : null;

    const primaryActionMarkup = primaryAction
      ? buttonsFrom(primaryAction, {primary: true})
      : null;

    const secondaryActionsMarkup = secondaryActions
      ? buttonsFrom(secondaryActions, {plain: true})
      : null;

    const paginationMarkup = pagination
      ? <Pagination {...pagination} plain />
      : null;

    const actionsMarkup = primaryAction || secondaryActions
      ? (
        <ButtonGroup>
          {secondaryActionsMarkup}
          {primaryActionMarkup}
          {paginationMarkup}
        </ButtonGroup>
      )
      : null;

    const iconMarkup = icon
      ? <div className={styles.Icon} style={{backgroundImage: icon}} />
      : null;

    return (
      <div className={className}>
        <div className={styles.Header}>
          <div className={styles.Details}>
            {iconMarkup}
            <div className={styles.Title}>
              {breadcrumbMarkup}
              <DisplayText size="large" element="h1">{title}</DisplayText>
            </div>
          </div>

          <div className={styles.Actions}>
            {actionsMarkup}
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>
    );
  }

  private handleEASDKMessaging() {
    const {easdk} = this.context;

    if (easdk) {
      easdk.Bar.update(this.props);
    }
  }
}
