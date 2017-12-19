import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {Button, Popover} from '../../../';
import {AppliedFilter, Filter} from './types';

export interface Props {
  filters: Filter[],
  resourceName: {
    singular: string,
    plural: string,
  },
  onAddFilter?(appliedFilter: AppliedFilter): void,
}

export interface State {
  popoverActive: boolean,
}

export default class FilterCreator extends React.PureComponent<Props, State> {
  state: State = {
    popoverActive: false,
  };

  private filterButtonLabel = 'Filter';
  private get filterCreateHeader() {
    const resourceNamePlural =
      this.props.resourceName.plural.toLocaleLowerCase();
    return `Show all ${resourceNamePlural} where:`;
  }

  render() {
    const {popoverActive} = this.state;

    const activator = (
      <Button
        onClick={this.togglePopover}
        disclosure
      >
        {this.filterButtonLabel}
      </Button>
    );

    return (
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={this.togglePopover}
        sectioned
      >
        {this.filterCreateHeader}
      </Popover>
    );
  }

  @autobind
  private togglePopover(): void {
    this.setState(({popoverActive}) => ({popoverActive: !popoverActive}));
  }
}

