import * as React from 'react';

import {Button, Popover, PopoverProps, ButtonProps} from '../src';
import {Omit} from './types';

interface PlayPopoverActivatorProps
  extends Omit<ButtonProps, 'children' | 'onClick'> {
  content: string;
}

interface State {
  active: boolean;
}

interface PlayPopoverProps
  extends Omit<PopoverProps, 'active' | 'onClose' | 'activator'> {
  activator: PlayPopoverActivatorProps;
}

export default class PlayPopover extends React.Component<
  PlayPopoverProps,
  State
> {
  state: State = {
    active: false,
  };

  render() {
    const {
      props: {
        activator: {content, ...restOfActivatorProps},
        ...restOfPopoverProps
      },
      state: {active},
      toggleActive,
    } = this;

    return (
      <Popover
        activator={
          <Button {...restOfActivatorProps} onClick={toggleActive}>
            {content}
          </Button>
        }
        active={active}
        onClose={toggleActive}
        {...restOfPopoverProps}
      />
    );
  }

  private toggleActive = () => {
    const {active} = this.state;
    this.setState({active: !active});
  };
}
