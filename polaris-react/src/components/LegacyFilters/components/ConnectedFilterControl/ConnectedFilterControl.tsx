import React, {Component, createRef} from 'react';

import {debounce} from '../../../../utilities/debounce';
import {classNames} from '../../../../utilities/css';
import type {DisableableAction} from '../../../../types';
import {Popover} from '../../../Popover';
import {Button} from '../../../Button';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../../EventListener';

import {Item} from './components';
import styles from './ConnectedFilterControl.module.css';

interface PopoverableAction extends DisableableAction {
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
  forceShowMorefiltersButton?: boolean;
  queryFieldHidden?: boolean;
}

interface ComputedProperty {
  [key: string]: number;
}

interface State {
  availableWidth: number;
  proxyButtonsWidth: ComputedProperty;
}

const FILTER_FIELD_MIN_WIDTH = 150;

export class ConnectedFilterControl extends Component<
  ConnectedFilterControlProps,
  State
> {
  state: State = {
    availableWidth: 0,
    proxyButtonsWidth: {},
  };

  private container = createRef<HTMLDivElement>();
  private proxyButtonContainer = createRef<HTMLDivElement>();
  private moreFiltersButtonContainer = createRef<HTMLDivElement>();

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
      forceShowMorefiltersButton = true,
      queryFieldHidden,
    } = this.props;

    const actionsToRender =
      rightPopoverableActions != null
        ? this.getActionsToRender(rightPopoverableActions)
        : [];

    const className = classNames(
      styles.ConnectedFilterControl,
      rightPopoverableActions && styles.right,
    );

    const shouldRenderMoreFiltersButton =
      forceShowMorefiltersButton ||
      (rightPopoverableActions &&
        rightPopoverableActions.length !== actionsToRender.length);

    const RightContainerClassName = classNames(
      styles.RightContainer,
      !shouldRenderMoreFiltersButton && styles.RightContainerWithoutMoreFilters,
      queryFieldHidden && styles.queryFieldHidden,
    );

    const rightMarkup =
      actionsToRender.length > 0 ? (
        <div className={RightContainerClassName}>
          {this.popoverFrom(actionsToRender)}
        </div>
      ) : null;

    const moreFiltersButtonContainerClassname = classNames(
      styles.MoreFiltersButtonContainer,
      actionsToRender.length === 0 && styles.onlyButtonVisible,
    );

    const rightActionMarkup = rightAction ? (
      <div
        ref={this.moreFiltersButtonContainer}
        className={moreFiltersButtonContainerClassname}
      >
        {shouldRenderMoreFiltersButton && <Item>{rightAction}</Item>}
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
            {this.activatorButtonFrom(action, {proxy: true})}
          </div>
        ))}
      </div>
    ) : null;

    const auxMarkup = auxiliary ? (
      <div className={styles.AuxiliaryContainer}>{auxiliary}</div>
    ) : null;

    return (
      <>
        {proxyButtonMarkup}
        <div className={styles.Wrapper}>
          <div className={className} ref={this.container}>
            {children ? (
              <div className={styles.CenterContainer}>
                <Item>{children}</Item>
              </div>
            ) : null}
            {rightMarkup}
            {rightActionMarkup}
            <EventListener event="resize" handler={this.handleResize} />
          </div>
          {auxMarkup}
        </div>
      </>
    );
  }

  private measureProxyButtons() {
    if (this.proxyButtonContainer.current) {
      const proxyButtonsWidth: ComputedProperty = {};
      // this number is magical, but tweaking it solved the problem of items overlapping
      const tolerance = 78;
      if (this.proxyButtonContainer.current) {
        Array.from(this.proxyButtonContainer.current.children).forEach(
          (element: Element) => {
            const buttonWidth =
              element.getBoundingClientRect().width + tolerance;
            const buttonKey =
              element instanceof HTMLElement && element.dataset.key;
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
      const containerWidth =
        this.container.current.getBoundingClientRect().width;
      const moreFiltersButtonWidth =
        this.moreFiltersButtonContainer.current.getBoundingClientRect().width;
      const filtersActionWidth = 0;

      const filterFieldMinWidth = this.props.queryFieldHidden
        ? 0
        : FILTER_FIELD_MIN_WIDTH;

      const availableWidth =
        containerWidth -
        filterFieldMinWidth -
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
      } else {
        // When we can't fit an action, we break the loop.
        // The ones that didn't fit will be accessible through the "More filters" button
        break;
      }
    }
    return actionsToReturn;
  }

  private activatorButtonFrom(
    action: PopoverableAction,
    options?: {proxy?: boolean},
  ): React.ReactElement {
    const id = options?.proxy ? undefined : `Activator-${action.key}`;
    return (
      <Button
        onClick={action.onAction}
        disclosure
        disabled={this.props.disabled || action.disabled}
        id={id}
        size="large"
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
