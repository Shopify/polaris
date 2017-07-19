import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {classNames} from '@shopify/react-utilities/styles';

import {IconableAction, DisableableAction} from '../../types';
import Button, {buttonsFrom} from '../Button';
import Breadcrumbs, {Props as BreadcrumbProps} from '../Breadcrumbs';
import Pagination, {PaginationDescriptor} from '../Pagination';
import DisplayText from '../DisplayText';
import Popover from '../Popover';
import ActionList from '../ActionList';

import Action from './Action';
import * as styles from './Page.scss';

export interface ActionGroup {
  title: string,
  icon?: IconableAction['icon'],
  actions: IconableAction[],
}

export interface Props {
  title: string,
  icon?: string,
  separator?: boolean,
  breadcrumbs?: BreadcrumbProps['breadcrumbs'],
  secondaryActions?: IconableAction[],
  primaryAction?: DisableableAction,
  pagination?: PaginationDescriptor,
  actionGroups?: ActionGroup[],
}

export interface State {
  openActionGroup?: string,
  rollupOpen: boolean,
}

export default class Header extends React.PureComponent<Props, State> {
  state: State = {
    rollupOpen: false,
  };

  private get hasRollup() {
    const {secondaryActions = [], actionGroups = []} = this.props;
    return secondaryActions.length + actionGroups.length > 1;
  }

  render() {
    const {
      title,
      breadcrumbs = [],
      primaryAction,
      pagination,
      separator,
      secondaryActions,
    } = this.props;

    const className = classNames(
      styles.Header,
      pagination && styles['Header-hasPagination'],
      separator && styles['Header-hasSeparator'],
      breadcrumbs && breadcrumbs.length && styles['Header-hasBreadcrumbs'],
      this.hasRollup && styles['Header-hasRollup'],
      secondaryActions && secondaryActions.length && styles['Header-hasSecondaryActions'],
    );

    const breadcrumbMarkup = breadcrumbs.length > 0
      ? <Breadcrumbs breadcrumbs={breadcrumbs} />
      : null;

    const primaryActionMarkup = primaryAction
      ? (
        <div className={styles.PrimaryAction}>
          {buttonsFrom(primaryAction, {primary: true})}
        </div>
      )
      : null;

    const paginationMarkup = pagination
      ? (
        <div className={styles.Pagination}>
          <Pagination {...pagination} plain />
        </div>
      )
      : null;

    const nonPrimaryActionsMarkup = this.renderSecondaryActions();
    const actionsMarkup = (
      <div className={styles.Actions}>
        {primaryActionMarkup}
        {nonPrimaryActionsMarkup}
      </div>
    );

    const navigationMarkup = breadcrumbMarkup || paginationMarkup
      ? (
        <div className={styles.Navigation}>
          {breadcrumbMarkup}
          {paginationMarkup}
        </div>
      )
      : null;

    const titleMarkup = (
      <div className={styles.Title}>
        <DisplayText size="large" element="h1">{title}</DisplayText>
      </div>
    );

    return primaryActionMarkup
      ? (
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
      )
      : (
        <div className={className}>
          {navigationMarkup}
          {titleMarkup}
          {actionsMarkup}
        </div>
      );
  }

  private renderSecondaryActions() {
    const {openActionGroup, rollupOpen} = this.state;
    const {secondaryActions = [], actionGroups = []} = this.props;

    if (secondaryActions.length === 0 && actionGroups.length === 0) {
      return null;
    }

    const secondaryActionMarkup = secondaryActions.length > 0
      ? secondaryActionsFrom(secondaryActions)
      : null;

    const actionGroupsMarkup = actionGroups.length > 0
      ? actionGroups.map(({title, icon, actions}) => (
        <div className={styles.ActionGroup}>
          <Popover
            key={title}
            active={title === openActionGroup}
            onClose={this.handleActionGroupClose.bind(this, title)}
            activator={
              <Action
                disclosure
                icon={icon}
                onAction={this.handleActionGroupOpen.bind(this, title)}
              >
                {title}
              </Action>
            }
          >
            <ActionList items={actions} />
          </Popover>
        </div>
      ))
      : null;

    const rollupMarkup = this.hasRollup
      ? (
        <div className={styles.Rollup}>
          <Popover
            active={rollupOpen}
            onClose={this.handleRollupToggle}
            activator={
              <Button
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

  private handleActionGroupClose(group: string) {
    this.setState(({openActionGroup}) => (
      openActionGroup === group
        ? {openActionGroup: undefined}
        : {}
    ));
  }

  private handleActionGroupOpen(group: string) {
    this.setState({openActionGroup: group});
  }
}

function convertActionGroupToActionListSection({title, actions}: ActionGroup) {
  return {title, items: actions};
}

function secondaryActionsFrom(actions: IconableAction[]) {
  return actions.map(({content, ...action}) => <Action {...action}>{content}</Action>);
}
