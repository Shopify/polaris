import React from 'react';
import debounce from 'lodash/debounce';
import {classNames} from '../../../../utilities/css';
import {buttonsFrom} from '../../../Button';
import {navigationBarCollapsed} from '../../../../utilities/breakpoints';
import EventListener from '../../../EventListener';
import {MenuActionDescriptor, MenuGroupDescriptor} from '../../../../types';
import Breadcrumbs, {Props as BreadcrumbsProps} from '../../../Breadcrumbs';

import Pagination, {PaginationDescriptor} from '../../../Pagination';
import ActionMenu, {hasGroupsWithActions} from '../../../ActionMenu';

import {HeaderPrimaryAction} from '../../types';
import {Title, TitleProps} from './components';
import styles from './Header.scss';

export interface Props extends TitleProps {
  /** Visually hide the title (stand-alone app use only) */
  titleHidden?: boolean;
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

export default class Header extends React.PureComponent<Props, State> {
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
      thumbnail,
      titleHidden = false,
      separator,
      primaryAction,
      pagination,
      breadcrumbs = [],
      secondaryActions = [],
      actionGroups = [],
    } = this.props;

    const {mobileView} = this.state;

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

    const pageTitleMarkup = (
      <Title
        title={title}
        subtitle={subtitle}
        titleMetadata={titleMetadata}
        thumbnail={thumbnail}
      />
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
            {pageTitleMarkup}
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
