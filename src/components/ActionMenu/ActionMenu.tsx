import * as React from 'react';
import {classNames} from '../../utilities/css';

import {
  ActionListSection,
  MenuActionDescriptor,
  MenuGroupDescriptor,
} from '../../types';

import {MenuAction, MenuGroup, RollupActions} from './components';

import styles from './ActionMenu.scss';

export interface Props {
  /** Collection of page-level actions */
  actions?: MenuActionDescriptor[];
  /** Collection of page-level groups of secondary actions */
  groups?: MenuGroupDescriptor[];
  /** Roll up all actions into a Popover > ActionList */
  rollup?: boolean;
}

interface State {
  activeMenuGroup?: string;
}

export default class ActionMenu extends React.PureComponent<Props, State> {
  state: State = {
    activeMenuGroup: undefined,
  };

  render() {
    const {actions = [], groups = [], rollup} = this.props;

    if (actions.length === 0 && groups.length === 0) {
      return null;
    }

    const actionMenuClassNames = classNames(
      styles.ActionMenu,
      rollup && styles.rollup,
    );
    const rollupSections = groups.map((group) => convertGroupToSection(group));

    return (
      <div className={actionMenuClassNames}>
        {rollup ? (
          <RollupActions items={actions} sections={rollupSections} />
        ) : (
          this.renderActions()
        )}
      </div>
    );
  }

  private renderActions = () => {
    const {actions = [], groups = []} = this.props;
    const {activeMenuGroup} = this.state;

    const actionsMarkup =
      actions.length > 0
        ? actions.map(({content, ...action}, index) => (
            <MenuAction
              key={`MenuAction-${content || index}`}
              content={content}
              {...action}
            />
          ))
        : null;

    const groupsMarkup = hasGroupsWithActions(groups)
      ? groups.map(({title, ...rest}, index) => (
          <MenuGroup
            key={`MenuGroup-${title || index}`}
            title={title}
            active={title === activeMenuGroup}
            {...rest}
            onOpen={this.handleMenuGroupOpen}
            onClose={this.handleMenuGroupClose}
          />
        ))
      : null;

    return actionsMarkup || groupsMarkup ? (
      <div className={styles.ActionsLayout}>
        {actionsMarkup}
        {groupsMarkup}
      </div>
    ) : null;
  };

  private handleMenuGroupOpen = (group: string) => {
    this.setState({activeMenuGroup: group});
  };

  private handleMenuGroupClose = () => {
    this.setState({activeMenuGroup: undefined});
  };
}

export function hasGroupsWithActions(groups: Props['groups'] = []) {
  return groups.length === 0
    ? false
    : groups.some((group) => group.actions.length > 0);
}

export function convertGroupToSection({
  title,
  actions,
}: MenuGroupDescriptor): ActionListSection {
  return {title, items: actions};
}
