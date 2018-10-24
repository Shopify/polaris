import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {
  Button,
  buttonsFrom,
  Breadcrumbs,
  Pagination,
  DisplayText,
  Popover,
  ActionList,
  BreadcrumbsProps,
} from '../../../../components';
import {PaginationDescriptor} from '../../../Pagination';
import {
  DisableableAction,
  LoadableAction,
  DestructableAction,
  IconableAction,
} from '../../../../types';
import {hasNewStatus} from './utilities';
import {Action, ActionGroup, ActionGroupDescriptor} from './components';
import * as styles from './Header.scss';

type SecondaryAction = IconableAction & DisableableAction;

interface PrimaryActionProps
  extends DisableableAction,
    LoadableAction,
    DestructableAction {
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
}

export interface Props {
  /** Page title, in large type */
  title: string;
  /** Important and non-interactive status information shown immediately after the title. */
  titleMetadata?: React.ReactNode;
  /** Visually hide the title */
  titleHidden?: boolean;
  /** App icon, for pages that are part of Shopify apps */
  icon?: string;
  /** Collection of breadcrumbs */
  breadcrumbs?: BreadcrumbsProps['breadcrumbs'];
  /** Adds a border to the bottom of the page header */
  separator?: boolean;
  /** Collection of secondary page-level actions */
  secondaryActions?: SecondaryAction[];
  /** Collection of page-level groups of secondary actions */
  actionGroups?: ActionGroupDescriptor[];
  /** Primary page-level action */
  primaryAction?: PrimaryActionProps;
  /** Page-level pagination */
  pagination?: PaginationDescriptor;
}

export interface State {
  openActionGroup?: string;
  rollupOpen: boolean;
}

export default class Header extends React.PureComponent<Props, State> {
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
    } = this.props;

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

    const nonPrimaryActionsMarkup = this.renderSecondaryActions();

    const actionsMarkup = (
      <div className={styles.Actions}>
        {primaryActionMarkup}
        {nonPrimaryActionsMarkup}
      </div>
    );

    const navigationMarkup =
      breadcrumbMarkup || paginationMarkup ? (
        <div className={styles.Navigation}>
          {breadcrumbMarkup}
          {paginationMarkup}
        </div>
      ) : null;

    const titleMarkup = (
      <div className={styles.Title}>
        {/* Anonymous divs are here for layout purposes */}
        <div>
          <DisplayText size="large" element="h1">
            {title}
          </DisplayText>
        </div>
        <div>{titleMetadata}</div>
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
    return secondaryActions.length + actionGroups.length > 1;
  }

  private renderSecondaryActions() {
    const {openActionGroup, rollupOpen} = this.state;
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
        ? actionGroups.map(({title, icon, actions, details}) => (
            <div className={styles.IndividualAction} key={title}>
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

    const showIndicator =
      false &&
      actionGroups.filter((group) => hasNewStatus(group.actions)).length > 0;

    const rollupMarkup = this.hasRollup ? (
      <div className={styles.Rollup}>
        <Popover
          active={rollupOpen}
          onClose={this.handleRollupToggle}
          activator={
            <Button
              outline={false && showIndicator}
              disclosure
              onClick={this.handleRollupToggle}
            >
              Actions
            </Button>
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

    return (
      <div className={styles.SecondaryActions}>
        {rollupMarkup}
        <div className={styles.IndividualActions}>
          {secondaryActionMarkup}
          {actionGroupsMarkup}
        </div>
      </div>
    );
  }

  @autobind
  private handleRollupToggle() {
    this.setState(({rollupOpen}) => ({rollupOpen: !rollupOpen}));
  }

  @autobind
  private handleActionGroupClose(group: string) {
    this.setState(
      ({openActionGroup}) =>
        openActionGroup === group ? {openActionGroup: undefined} : {},
    );
  }

  @autobind
  private handleActionGroupOpen(group: string) {
    this.setState({openActionGroup: group});
  }
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
