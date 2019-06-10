import * as React from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';

import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import ActionList, {Props as ActionListProps} from '../ActionList';
import Button from '../Button';
import Popover from '../Popover';

export interface Props {
  /** Collection of actions for the list */
  items?: ActionListProps['items'];
  /** Collection of sectioned action items */
  sections?: ActionListProps['sections'];
}

type CombinedProps = Props & WithAppProviderProps;

interface State {
  rollupOpen: boolean;
}

class RollupActions extends React.PureComponent<CombinedProps, State> {
  state: State = {
    rollupOpen: false,
  };

  render() {
    const {rollupOpen} = this.state;
    const {
      items = [],
      sections = [],
      polaris: {intl},
    } = this.props;

    return items.length >= 1 || sections.length >= 1 ? (
      <Popover
        active={rollupOpen}
        activator={
          <Button
            plain
            icon={HorizontalDotsMinor}
            accessibilityLabel={intl.translate(
              'Polaris.Page.RollupActions.rollupButton',
            )}
            onClick={this.handleRollupToggle}
          />
        }
        onClose={this.handleRollupToggle}
      >
        <ActionList
          items={items}
          sections={sections}
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
