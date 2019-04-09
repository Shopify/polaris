import * as React from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';
import {classNames} from '@shopify/react-utilities/styles';
import {
  DisableableAction,
  LoadableAction,
  DestructableAction,
  IconableAction,
  AppBridgeAction,
  AppBridgeActionTarget,
} from '../../../../types';
import ActionList from '../../../ActionList';
import Button, {buttonsFrom} from '../../../Button';
import Breadcrumbs, {Props as BreadcrumbsProps} from '../../../Breadcrumbs';
import DisplayText from '../../../DisplayText';
import Pagination, {PaginationDescriptor} from '../../../Pagination';
import Popover from '../../../Popover';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import {Action, ActionGroup, ActionGroupDescriptor} from './components';
import styles from './Header.scss';

export interface SecondaryAction
  extends IconableAction,
    DisableableAction,
    AppBridgeActionTarget {}

export interface PrimaryActionProps
  extends DisableableAction,
    LoadableAction,
    AppBridgeAction,
    DestructableAction {
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
}

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
  secondaryActions?: SecondaryAction[];
  /** Collection of page-level groups of secondary actions */
  actionGroups?: ActionGroupDescriptor[];
  /** Primary page-level action */
  primaryAction?: PrimaryActionProps;
  /** Page-level pagination (stand-alone app use only) */
  pagination?: PaginationDescriptor;
}

export interface State {
  openActionGroup?: string;
  rollupOpen: boolean;
}

export type CombinedProps = Props & WithAppProviderProps;

class Header extends React.PureComponent<CombinedProps, State> {
  state: State = {
    rollupOpen: false,
  };

  render() {
    const {
      title,
      titleMetadata,
      breadcrumbs = [],
      titleHidden = false,
      primaryAction,
      pagination,
      separator,
      secondaryActions,
      icon,
      actionGroups,
      polaris: {intl},
    } = this.props;

    if (icon) {
      // eslint-disable-next-line no-console
      console.warn(intl.translate('Polaris.Page.Header.iconWarningMessage'));
    }

    const className = classNames(
      styles.Header,
      titleHidden && styles['Title-hidden'],
      pagination && styles['Header-hasPagination'],
      separator && styles['Header-hasSeparator'],
      breadcrumbs && breadcrumbs.length && styles['Header-hasBreadcrumbs'],
      this.hasRollup && styles['Header-hasRollup'],
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
      <div className={styles.Pagination}>
        <Pagination {...pagination} plain />
      </div>
    ) : null;

    const rollupMarkup = this.renderRollupAction();
    const nonPrimaryActionsMarkup = this.renderSecondaryActions();

    const actionsMarkup =
      primaryAction || secondaryActions || actionGroups ? (
        <div className={styles.Actions}>
          {nonPrimaryActionsMarkup}
          {primaryActionMarkup}
        </div>
      ) : null;

    const navigationMarkup =
      breadcrumbMarkup || paginationMarkup ? (
        <div className={styles.Navigation}>
          {breadcrumbMarkup}
          {paginationMarkup}
          {breadcrumbMarkup && rollupMarkup}
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
        {!breadcrumbMarkup && rollupMarkup}
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

  private get hasRollup() {
    const {secondaryActions = [], actionGroups = []} = this.props;
    return secondaryActions.length + actionGroups.length >= 1;
  }

  private renderRollupAction = () => {
    const {rollupOpen} = this.state;
    const {secondaryActions = [], actionGroups = []} = this.props;
    const rollupMarkup = this.hasRollup ? (
      <div className={styles.Rollup}>
        <Popover
          active={rollupOpen}
          onClose={this.handleRollupToggle}
          activator={
            <Button
              plain
              icon={HorizontalDotsMinor}
              onClick={this.handleRollupToggle}
            />
          }
        >
          <ActionList
            items={secondaryActions}
            sections={actionGroups.map(convertActionGroupToActionListSection)}
            onActionAnyItem={this.handleRollupToggle}
          />
        </Popover>
      </div>
    ) : null;

    return rollupMarkup;
  };

  private renderSecondaryActions = () => {
    const {openActionGroup} = this.state;
    const {secondaryActions = [], actionGroups = []} = this.props;

    if (secondaryActions.length === 0 && actionGroups.length === 0) {
      return null;
    }

    const secondaryActionMarkup =
      secondaryActions.length > 0
        ? secondaryActionsFrom(secondaryActions)
        : null;

    const actionGroupsMarkup =
      actionGroups.length > 0
        ? actionGroups.map(({title, icon, actions, details}, index) => (
            <div
              className={styles.IndividualAction}
              key={`ActionGroup-${title}-${index}`}
            >
              <ActionGroup
                title={title}
                icon={icon}
                actions={actions}
                details={details}
                onOpen={this.handleActionGroupOpen}
                onClose={this.handleActionGroupClose}
                active={title === openActionGroup}
              />
            </div>
          ))
        : null;

    return (
      <div className={styles.SecondaryActions}>
        <div className={styles.IndividualActions}>
          {secondaryActionMarkup}
          {actionGroupsMarkup}
        </div>
      </div>
    );
  };

  private handleRollupToggle = () => {
    this.setState(({rollupOpen}) => ({rollupOpen: !rollupOpen}));
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
}: ActionGroupDescriptor) {
  return {title, items: actions};
}

function secondaryActionsFrom(
  actions: SecondaryAction[],
): ReadonlyArray<JSX.Element> {
  return actions.map(({content, ...action}, index) => (
    <div className={styles.IndividualAction} key={`Action-${content || index}`}>
      <Action {...action}>{content}</Action>
    </div>
  ));
}

export default withAppProvider<Props>()(Header);
