import * as React from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';

import {MenuActionDescriptor, ActionListSection} from '../../../../types';

import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import ActionList from '../../../ActionList';
import Button from '../../../Button';
import Popover from '../../../Popover';

import styles from './RollupActions.scss';

export interface Props {
  /** Collection of actions for the list */
  items?: MenuActionDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
}

type ComposedProps = Props & WithAppProviderProps;

interface State {
  rollupOpen: boolean;
}

class RollupActions extends React.PureComponent<ComposedProps, State> {
  state: State = {
    rollupOpen: false,
  };

  render() {
    const {
      items = [],
      sections = [],
      polaris: {intl},
    } = this.props;
    const {rollupOpen} = this.state;

    if (items.length === 0 && sections.length === 0) {
      return null;
    }

    const activatorMarkup = (
      <div className={styles.RollupActivator}>
        <Button
          plain
          icon={HorizontalDotsMinor}
          accessibilityLabel={intl.translate(
            'Polaris.ActionMenu.RollupActions.rollupButton',
          )}
          onClick={this.handleRollupToggle}
        />
      </div>
    );

    return (
      <Popover
        active={rollupOpen}
        activator={activatorMarkup}
        preferredAlignment="right"
        onClose={this.handleRollupToggle}
      >
        <ActionList
          items={items}
          sections={sections}
          onActionAnyItem={this.handleRollupToggle}
        />
      </Popover>
    );
  }

  private handleRollupToggle = () => {
    this.setState(({rollupOpen}) => ({rollupOpen: !rollupOpen}));
  };
}

export default withAppProvider<Props>()(RollupActions);
