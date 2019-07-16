import * as React from 'react';
import {classNames} from '@shopify/css-utilities';
import debounce from 'lodash/debounce';

import {navigationBarCollapsed} from '../../../../utilities/breakpoints';

import {MenuActionDescriptor, MenuGroupDescriptor} from '../../../../types';

import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import EventListener from '../../../EventListener';
import {buttonsFrom} from '../../../Button';
import Breadcrumbs, {Props as BreadcrumbsProps} from '../../../Breadcrumbs';
import DisplayText from '../../../DisplayText';
import Heading from '../../../Heading';
import Pagination, {PaginationDescriptor} from '../../../Pagination';
import ActionMenu, {hasGroupsWithActions} from '../../../ActionMenu';

import {HeaderPrimaryAction} from '../../types';
import styles from './Header.scss';

export interface Props {
  /** Page title, in large type */
  title: string;
  /** Page subtitle, in medium type (stand-alone app use only) */
  subtitle?: string;
  /** Important and non-interactive status information shown immediately after the title. (stand-alone app use only) */
  titleMetadata?: React.ReactNode;
  /** Visually hide the title (stand-alone app use only) */
  titleHidden?: boolean;
  /**
   * Application icon for identifying embedded applications
   * @embeddedAppOnly
   */
  icon?: string;
  /** Adds a border to the bottom of the page header (stand-alone app use only) */
  separator?: boolean;
  /** Primary page-level action */
  primaryAction?: HeaderPrimaryAction;
  /** Page-level pagination (stand-alone app use only) */
  pagination?: PaginationDescriptor;
  /** Collection of breadcrumbs */
  breadcrumbs?: BreadcrumbsProps['breadcrumbs'];
  /** Collection of secondary page-level actions */
  secondaryActions?: MenuActionDescriptor[];
  /** Collection of page-level groups of secondary actions */
  actionGroups?: MenuGroupDescriptor[];
}

interface State {
  mobileView?: boolean;
}

type ComposedProps = Props & WithAppProviderProps;

class Header extends React.PureComponent<ComposedProps, State> {
  state: State = {
    mobileView: isMobileView(),
  };

  private handleResize = debounce(
    () => {
      const {
        state: {mobileView},
        handleToggleMobile,
      } = this;

      if (mobileView !== isMobileView()) {
        handleToggleMobile();
      }
    },
    40,
    {leading: true, trailing: true, maxWait: 40},
  );

  componentDidMount() {
    const {
      state: {mobileView},
      handleToggleMobile,
    } = this;

    if (mobileView !== isMobileView()) {
      handleToggleMobile();
    }
  }

  render() {
    const {
      title,
      subtitle,
      titleMetadata,
      titleHidden = false,
      icon,
      separator,
      primaryAction,
      pagination,
      breadcrumbs = [],
      secondaryActions = [],
      actionGroups = [],
      polaris: {intl},
    } = this.props;

    const {mobileView} = this.state;

    if (icon) {
      // eslint-disable-next-line no-console
      console.warn(intl.translate('Polaris.Page.Header.iconWarningMessage'));
    }

    const breadcrumbMarkup =
      breadcrumbs.length > 0 ? (
        <div className={styles.BreadcrumbWrapper}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      ) : null;

    const paginationMarkup =
      pagination && !mobileView ? (
        <div className={styles.PaginationWrapper}>
          <Pagination {...pagination} plain />
        </div>
      ) : null;

    const navigationMarkup =
      breadcrumbMarkup || paginationMarkup ? (
        <div className={styles.Navigation}>
          {breadcrumbMarkup}
          {paginationMarkup}
        </div>
      ) : null;

    const titleMetadataMarkup = titleMetadata ? (
      <div className={styles.TitleMetadata}>{titleMetadata}</div>
    ) : null;

    const subtitleMarkup = subtitle ? (
      <Heading element="h2">{subtitle}</Heading>
    ) : null;

    const titleSecondaryContent =
      subtitle || titleMetadata ? (
        <div className={styles.TitleSecondaryContent}>
          {subtitleMarkup}
          {titleMetadataMarkup}
        </div>
      ) : null;

    const titleClassName = classNames(
      styles.Title,
      subtitle && styles.hasSubtitle,
    );

    const titleMarkup = (
      <div className={titleClassName}>
        <DisplayText size="large" element="h1">
          {title}
        </DisplayText>
        {titleSecondaryContent}
      </div>
    );

    const primaryActionMarkup = primaryAction ? (
      <div className={styles.PrimaryActionWrapper}>
        {buttonsFrom(primaryAction, {
          primary: true,
        })}
      </div>
    ) : null;

    const actionMenuMarkup =
      secondaryActions.length > 0 || hasGroupsWithActions(actionGroups) ? (
        <div className={styles.ActionMenuWrapper}>
          <ActionMenu
            actions={secondaryActions}
            groups={actionGroups}
            rollup={mobileView}
          />
        </div>
      ) : null;

    const headerClassNames = classNames(
      styles.Header,
      titleHidden && styles.titleHidden,
      separator && styles.separator,
      navigationMarkup && styles.hasNavigation,
      actionMenuMarkup && styles.hasActionMenu,
      mobileView && styles.mobileView,
    );

    return (
      <div className={headerClassNames}>
        {navigationMarkup}

        <div className={styles.MainContent}>
          <div className={styles.TitleActionMenuWrapper}>
            {titleMarkup}
            {actionMenuMarkup}
          </div>

          {primaryActionMarkup}
        </div>

        <EventListener event="resize" handler={this.handleResize} passive />
      </div>
    );
  }

  private handleToggleMobile = () => {
    const {mobileView} = this.state;
    this.setState({mobileView: !mobileView});
  };
}

// TODO: Can we instead get this from the <Frame />?
// Or perhaps store in Context to be shared across components?
function isMobileView(): boolean {
  return navigationBarCollapsed().matches;
}

export default withAppProvider<Props>()(Header);
