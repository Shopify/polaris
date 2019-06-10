import * as React from 'react';
import {classNames} from '@shopify/css-utilities';

import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import {buttonsFrom} from '../../../Button';
import Breadcrumbs, {Props as BreadcrumbsProps} from '../../../Breadcrumbs';
import DisplayText from '../../../DisplayText';
import Pagination, {PaginationDescriptor} from '../../../Pagination';
import PlainActionGroup, {
  PlainActionGroupDescriptor,
} from '../../../PlainActionGroup';
import PlainAction from '../../../PlainAction';
import RollupActions, {
  Props as RollupActionsProps,
} from '../../../RollupActions';

import {HeaderPrimaryAction} from './types';
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
  /** Collection of breadcrumbs */
  breadcrumbs?: BreadcrumbsProps['breadcrumbs'];
  /** Adds a border to the bottom of the page header (stand-alone app use only) */
  separator?: boolean;
  /** Collection of secondary page-level actions */
  secondaryActions?: RollupActionsProps['items'];
  /** Collection of page-level groups of secondary actions */
  actionGroups?: PlainActionGroupDescriptor[];
  /** Primary page-level action */
  primaryAction?: HeaderPrimaryAction;
  /** Page-level pagination (stand-alone app use only) */
  pagination?: PaginationDescriptor;
}

interface State {
  openActionGroup?: string;
}

type CombinedProps = Props & WithAppProviderProps;

class Header extends React.PureComponent<CombinedProps, State> {
  state: State = {
    openActionGroup: undefined,
  };

  render() {
    const {
      title,
      titleMetadata,
      titleHidden = false,
      icon,
      breadcrumbs = [],
      separator,
      secondaryActions = [],
      actionGroups = [],
      primaryAction,
      pagination,
      polaris: {intl},
    } = this.props;

    if (icon) {
      // eslint-disable-next-line no-console
      console.warn(intl.translate('Polaris.Page.Header.iconWarningMessage'));
    }

    const hasRollupActions =
      secondaryActions.length > 0 || actionGroups.length > 0;

    const className = classNames(
      styles.Header,
      titleHidden && styles['Title-hidden'],
      breadcrumbs && breadcrumbs.length && styles['Header-hasBreadcrumbs'],
      separator && styles['Header-hasSeparator'],
      pagination && styles['Header-hasPagination'],
      hasRollupActions && styles['Header-hasRollupActions'],
      secondaryActions &&
        secondaryActions.length &&
        styles['Header-hasSecondaryActions'],
    );

    const breadcrumbMarkup =
      breadcrumbs.length > 0 ? <Breadcrumbs breadcrumbs={breadcrumbs} /> : null;

    const primary =
      primaryAction &&
      (primaryAction.primary === undefined ? true : primaryAction.primary);

    const primaryActionMarkup = primaryAction ? (
      <div className={styles.PrimaryAction}>
        {buttonsFrom(primaryAction, {primary})}
      </div>
    ) : null;

    const paginationMarkup = pagination ? (
      <div className={styles.PaginationWrapper}>
        <Pagination {...pagination} plain />
      </div>
    ) : null;

    const rollupSections = actionGroups.map((group) =>
      convertActionGroupToActionListSection(group),
    );
    const rollupActionsMarkup = hasRollupActions ? (
      <div className={styles.RollupActionsWrapper}>
        <RollupActions items={secondaryActions} sections={rollupSections} />
      </div>
    ) : null;

    const actionsMarkup =
      primaryAction || secondaryActions || actionGroups ? (
        <div className={styles.Actions}>
          {this.renderSecondaryActions()}
          {primaryActionMarkup}
        </div>
      ) : null;

    const navigationMarkup =
      breadcrumbMarkup || paginationMarkup ? (
        <div className={styles.Navigation}>
          {breadcrumbMarkup}
          {paginationMarkup}
          {breadcrumbMarkup && rollupActionsMarkup}
        </div>
      ) : null;

    const titleMarkup = (
      <div className={styles.TitleAndRollup}>
        <div className={styles.Title}>
          {/* Anonymous divs are here for layout purposes */}
          <div>
            <DisplayText size="large" element="h1">
              {title}
            </DisplayText>
          </div>

          <div>{titleMetadata}</div>
        </div>

        {!breadcrumbMarkup && rollupActionsMarkup}
      </div>
    );

    return primaryActionMarkup ? (
      <div className={className}>
        {navigationMarkup}

        <div className={styles.MainContent}>
          <div className={styles.TitleAndActions}>
            {titleMarkup}
            {actionsMarkup}
          </div>

          {primaryActionMarkup}
        </div>
      </div>
    ) : (
      <div className={className}>
        {navigationMarkup}
        {titleMarkup}
        {actionsMarkup}
      </div>
    );
  }

  private renderSecondaryActions = () => {
    const {openActionGroup} = this.state;
    const {secondaryActions = [], actionGroups = []} = this.props;

    const secondaryActionMarkup =
      secondaryActions.length > 0
        ? secondaryActionsFrom(secondaryActions)
        : null;

    const actionGroupsMarkup =
      actionGroups.length > 0
        ? actionGroups.map(({title, actions, icon, details}, index) => (
            <div
              key={`PlainActionGroup-${title}-${index}`}
              className={styles.IndividualAction}
            >
              <PlainActionGroup
                title={title}
                icon={icon}
                actions={actions}
                details={details}
                active={title === openActionGroup}
                onOpen={this.handleActionGroupOpen}
                onClose={this.handleActionGroupClose}
              />
            </div>
          ))
        : null;

    return secondaryActionMarkup || actionGroupsMarkup ? (
      <div className={styles.SecondaryActions}>
        <div className={styles.IndividualActions}>
          {secondaryActionMarkup}
          {actionGroupsMarkup}
        </div>
      </div>
    ) : null;
  };

  private handleActionGroupClose = (group: string) => {
    this.setState(
      ({openActionGroup}) =>
        openActionGroup === group ? {openActionGroup: undefined} : {},
    );
  };

  private handleActionGroupOpen = (group: string) => {
    this.setState({openActionGroup: group});
  };
}

function convertActionGroupToActionListSection({
  title,
  actions,
}: PlainActionGroupDescriptor) {
  return {title, items: actions};
}

function secondaryActionsFrom(
  items: RollupActionsProps['items'],
): React.ReactNode {
  if (items == null || items.length === 0) {
    return null;
  }

  return items.map(({content, ...item}, index) => (
    <div
      key={`IndividualAction-${content || index}`}
      className={styles.IndividualAction}
    >
      <PlainAction {...item} content={content} />
    </div>
  ));
}

export default withAppProvider<Props>()(Header);
