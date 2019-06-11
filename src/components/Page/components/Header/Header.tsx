import * as React from 'react';
import {classNames} from '@shopify/css-utilities';
import debounce from 'lodash/debounce';

import {navigationBarCollapsed} from '../../../../utilities/breakpoints';

import {ActionListItemDescriptor, MenuGroupDescriptor} from '../../../../types';

import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import EventListener from '../../../EventListener';
import {buttonsFrom} from '../../../Button';
import Breadcrumbs, {Props as BreadcrumbsProps} from '../../../Breadcrumbs';
import DisplayText from '../../../DisplayText';
import Pagination, {PaginationDescriptor} from '../../../Pagination';
import Menu from '../../../Menu';

import {HeaderPrimaryAction} from '../../types';
import styles from './Header.scss';

export interface Props {
  /** Page title, in large type */
  title: string;
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
  secondaryActions?: ActionListItemDescriptor[];
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

    const titleMarkup = (
      <div className={styles.Title}>
        <div className={styles.DisplayTextWrapper}>
          <DisplayText size="large" element="h1">
            {title}
          </DisplayText>
        </div>

        {titleMetadata && (
          <div className={styles.TitleMetadataWrapper}>{titleMetadata}</div>
        )}
      </div>
    );

    const primaryActionMarkup = primaryAction ? (
      <div className={styles.PrimaryActionWrapper}>
        {buttonsFrom(primaryAction, {
          primary:
            primaryAction.primary === undefined ? true : primaryAction.primary,
        })}
      </div>
    ) : null;

    const menuMarkup =
      secondaryActions.length > 0 || actionGroups.length > 0 ? (
        <div className={styles.MenuWrapper}>
          <Menu
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
      menuMarkup && styles.hasMenu,
      mobileView && styles.mobileView,
    );

    return (
      <div className={headerClassNames}>
        {navigationMarkup}

        <div className={styles.MainContent}>
          <div className={styles.TitleMenuWrapper}>
            {titleMarkup}
            {menuMarkup}
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
