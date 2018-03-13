import * as React from 'react';
import * as PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import {classNames} from '@shopify/react-utilities/styles';

import {IconableAction, DisableableAction, LoadableAction} from '../../types';
import {PaginationDescriptor} from '../Pagination';
import {Props as BreadcrumbProps} from '../Breadcrumbs';

import Header, {ActionGroup, Props as HeaderProps} from './Header';

export type SecondaryAction = IconableAction & DisableableAction;

import * as styles from './Page.scss';

export interface HeaderProps {
  /** Page title, in large type */
  title: string,
  /** Visually hide the title */
  titleHidden?: boolean,
  /** App icon, for pages that are part of Shopify apps */
  icon?: string,
  /** Collection of breadcrumbs */
  breadcrumbs?: BreadcrumbProps['breadcrumbs'],
  /** Adds a border to the bottom of the page header */
  separator?: boolean,
  /** Collection of secondary page-level actions */
  secondaryActions?: SecondaryAction[],
  /** Collection of page-level groups of secondary actions */
  actionGroups?: ActionGroup[],
  /** Primary page-level action */
  primaryAction?: DisableableAction & LoadableAction,
  /** Page-level pagination */
  pagination?: PaginationDescriptor,
}

export interface Props extends HeaderProps {
  /** The contents of the page */
  children?: React.ReactNode,
  /** Remove the normal max-width on the page */
  fullWidth?: boolean,
  /** Decreases the maximum layout width. Intended for single-column layouts */
  singleColumn?: boolean,
}

const EASDK_PROPS: (keyof Props)[] = [
  'title',
  'icon',
  'breadcrumbs',
  'secondaryActions',
  'actionGroups',
  'primaryAction',
  'pagination',
];

export default class Page extends React.PureComponent<Props, never> {
  static contextTypes = {easdk: PropTypes.object};

  componentDidMount() {
    if (this.context.easdk == null) { return; }
    this.handleEASDKMessaging();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.context.easdk == null) { return; }

    const prevEASDKProps = pick(prevProps, EASDK_PROPS);
    const currentEASDKProps = pick(this.props, EASDK_PROPS);

    if (!isEqual(prevEASDKProps, currentEASDKProps)) {
      this.handleEASDKMessaging();
    }
  }

  render() {
    const {
      children,
      fullWidth,
      singleColumn,
      ...rest,
    } = this.props;

    const className = classNames(
      styles.Page,
      fullWidth && styles.fullWidth,
      singleColumn && styles.singleColumn,
    );

    const headerMarkup = this.context.easdk || !this.hasHeaderContent()
      ? null
      : <Header {...rest} />;

    return (
      <div className={className}>
        {headerMarkup}
        <div className={styles.Content}>
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

  private hasHeaderContent() {
    const { title, primaryAction, secondaryActions, breadcrumbs } = this.props;
    return (
      (title && title !== '')
      || primaryAction
      || (secondaryActions && secondaryActions.length > 0)
      || (breadcrumbs && breadcrumbs.length > 0)
    );
  }
}
