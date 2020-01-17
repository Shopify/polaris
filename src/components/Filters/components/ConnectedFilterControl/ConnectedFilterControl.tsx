import React from 'react';
import debounce from 'lodash/debounce';
import {classNames} from '../../../../utilities/css';

import {DisableableAction} from '../../../../types';
import {Popover} from '../../../Popover';
import {Button} from '../../../Button';
import {EventListener} from '../../../EventListener';
import {Item} from './components';

import styles from './ConnectedFilterControl.scss';

export interface PopoverableAction extends DisableableAction {
  popoverOpen: boolean;
  popoverContent: React.ReactNode;
  key: string;
  content: string;
  onAction(): void;
}

export interface ConnectedFilterControlProps {
  children: React.ReactNode;
  rightPopoverableActions?: PopoverableAction[] | null;
  rightAction?: React.ReactNode;
  auxiliary?: React.ReactNode;
  disabled?: boolean;
}

interface ComputedProperty {
  [key: string]: number;
}

interface State {
  availableWidth: number;
  proxyButtonsWidth: ComputedProperty;
}

const FILTER_FIELD_MIN_WIDTH = 150;

export class ConnectedFilterControl extends React.Component<
  ConnectedFilterControlProps,
  State
> {
  state: State = {
    availableWidth: 0,
    proxyButtonsWidth: {},
  };

  private container = React.createRef<HTMLDivElement>();
  private proxyButtonContainer = React.createRef<HTMLDivElement>();
  private moreFiltersButtonContainer = React.createRef<HTMLDivElement>();

  private handleResize = debounce(
    () => {
      this.measureProxyButtons();
      this.measureAvailableWidth();
    },
    40,
    {leading: true, trailing: true, maxWait: 40},
  );

  componentDidMount() {
    this.handleResize();
  }

  render() {
    const {
      children,
      rightPopoverableActions,
      rightAction,
      auxiliary,
    } = this.props;

    const className = classNames(
      styles.ConnectedFilterControl,
      rightPopoverableActions && styles.right,
    );

    const rightMarkup = rightPopoverableActions ? (
      <div className={styles.RightContainer} testID="FilterShortcutContainer">
        {this.popoverFrom(this.getActionsToRender(rightPopoverableActions))}
      </div>
    ) : null;

    const rightActionMarkup = rightAction ? (
      <div
        ref={this.moreFiltersButtonContainer}
        className={styles.MoreFiltersButtonContainer}
      >
        <Item>{rightAction}</Item>
      </div>
    ) : null;

    const proxyButtonMarkup = rightPopoverableActions ? (
      <div
        className={styles.ProxyButtonContainer}
        ref={this.proxyButtonContainer}
        aria-hidden
      >
        {rightPopoverableActions.map((action) => (
          <div key={action.key} data-key={action.key}>
            {this.activatorButtonFrom(action)}
          </div>
        ))}
      </div>
    ) : null;

    const auxMarkup = auxiliary ? (
      <div className={styles.AuxiliaryContainer}>{auxiliary}</div>
    ) : null;

    return (
      <React.Fragment>
        {proxyButtonMarkup}
        <div className={styles.Wrapper}>
          <div className={className} ref={this.container}>
            <div className={styles.CenterContainer}>
              <Item>{children}</Item>
            </div>
            {rightMarkup}
            {rightActionMarkup}
            <EventListener event="resize" handler={this.handleResize} />
          </div>
          {auxMarkup}
        </div>
      </React.Fragment>
    );
  }

  private measureProxyButtons() {
    if (this.proxyButtonContainer.current) {
      const proxyButtonsWidth: ComputedProperty = {};
      // this number is magical, but tweaking it solved the problem of items overlapping
      const tolerance = 52;
      if (this.proxyButtonContainer.current) {
        Array.from(this.proxyButtonContainer.current.children).forEach(
          (element: Element) => {
            const buttonWidth =
              element.getBoundingClientRect().width + tolerance;
            const buttonKey = (element as HTMLElement).dataset.key;
            if (buttonKey) {
              proxyButtonsWidth[buttonKey] = buttonWidth;
            }
          },
        );
      }

      this.setState({proxyButtonsWidth});
    }
  }

  private measureAvailableWidth() {
    if (this.container.current && this.moreFiltersButtonContainer.current) {
      const containerWidth = this.container.current.getBoundingClientRect()
        .width;
      const moreFiltersButtonWidth = this.moreFiltersButtonContainer.current.getBoundingClientRect()
        .width;
      const filtersActionWidth = 0;

      const availableWidth =
        containerWidth -
        FILTER_FIELD_MIN_WIDTH -
        moreFiltersButtonWidth -
        filtersActionWidth;

      this.setState({availableWidth});
    }
  }

  private getActionsToRender(
    actions: PopoverableAction[],
  ): PopoverableAction[] {
    let remainingWidth = this.state.availableWidth;
    const actionsToReturn: PopoverableAction[] = [];
    for (let i = 0; remainingWidth > 0 && i < actions.length; i++) {
      const action = actions[i];
      const actionWidth = this.state.proxyButtonsWidth[action.key];
      if (actionWidth <= remainingWidth) {
        actionsToReturn.push(action);
        remainingWidth -= actionWidth;
      }
    }
    return actionsToReturn;
  }

  private activatorButtonFrom(action: PopoverableAction): React.ReactElement {
    return (
      <Button
        onClick={action.onAction}
        disclosure
        disabled={this.props.disabled || action.disabled}
        id={`Activator-${action.key}`}
      >
        {action.content}
      </Button>
    );
  }

  private popoverFrom(actions: PopoverableAction[]): React.ReactElement[] {
    return actions.map((action) => {
      return (
        <Item key={action.key}>
          <Popover
            active={action.popoverOpen}
            activator={this.activatorButtonFrom(action)}
            onClose={action.onAction}
            preferredAlignment="left"
            sectioned
          >
            {action.popoverContent}
          </Popover>
        </Item>
      );
    });
  }
}
