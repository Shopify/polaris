import * as React from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';

import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import {PlainActionGroupDescriptor} from '../PlainActionGroup';

import ActionList from '../ActionList';
import Button from '../Button';
import Popover from '../Popover';

import {RollupSecondaryAction} from './types';
import {hasRollupActions, convertActionGroupToActionListSection} from './utils';

export interface Props {
  /** Collection of secondary page-level actions */
  secondaryActions?: RollupSecondaryAction[];
  /** Collection of page-level groups of secondary actions */
  actionGroups?: PlainActionGroupDescriptor[];
}

export type CombinedProps = Props & WithAppProviderProps;

export interface State {
  openActionGroup?: string;
  rollupOpen: boolean;
}

class RollupActions extends React.PureComponent<CombinedProps, State> {
  state: State = {
    rollupOpen: false,
  };

  render() {
    const {rollupOpen} = this.state;
    const {
      secondaryActions = [],
      actionGroups = [],
      polaris: {intl},
    } = this.props;

    return hasRollupActions(secondaryActions, actionGroups) ? (
      <Popover
        active={rollupOpen}
        activator={
          <Button
            plain
            icon={HorizontalDotsMinor}
            onClick={this.handleRollupToggle}
            accessibilityLabel={intl.translate(
              'Polaris.Page.RollupActions.rollupButton',
            )}
          />
        }
        onClose={this.handleRollupToggle}
      >
        <ActionList
          items={secondaryActions}
          sections={actionGroups.map(convertActionGroupToActionListSection)}
          onActionAnyItem={this.handleRollupToggle}
        />
      </Popover>
    ) : null;
  }

  private handleRollupToggle = () => {
    this.setState(({rollupOpen}) => ({rollupOpen: !rollupOpen}));
  };
}

export default withAppProvider<Props>()(RollupActions);
