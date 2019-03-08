import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {noop} from '@shopify/javascript-utilities/other';
import {
  ActionList,
  withAppProvider,
  WithAppProviderProps,
  Popover,
  ButtonGroup,
  Button,
  buttonsFrom,
  DisableableAction,
  AvatarProps,
  ThumbnailProps,
} from '@shopify/polaris';
import {contextTypes, MouseButton, SELECT_ALL_ITEMS} from '../../types';
import Handle from './Handle';
import Accessible from './Accessible';

import * as styles from './Item.scss';

export type ExceptionStatus = 'neutral' | 'warning' | 'critical';
export type MediaSize = 'small' | 'medium' | 'large';
export type MediaType = 'avatar' | 'thumbnail';

export interface BaseProps {
  // Visually hidden text for screen readers
  accessibilityLabel?: string;
  // Id of the element the item onClick controls
  ariaControls?: string;
  // Tells screen reader the controlled element is expanded
  ariaExpanded?: boolean;
  // Unique identifier for the item
  id: string;
  index: number;
  media?: React.ReactElement<AvatarProps | ThumbnailProps>;
  persistActions?: boolean;
  shortcutActions?: DisableableAction[];
  children?: React.ReactNode;
  onMouseEnter?(): void;
  onMouseLeave?(): void;
  onBlur?(): void;
  onFocus?(): void;
}

export interface PropsWithUrl extends BaseProps {
  url: string;
  onClick?(id?: string): void;
}

export interface PropsWithClick extends BaseProps {
  url?: string;
  onClick(id?: string): void;
}

export type Props = PropsWithUrl | PropsWithClick;

export interface State {
  actionsMenuVisible: boolean;
  focused: boolean;
  focusedInner: boolean;
}

export type CombinedProps =
  | PropsWithUrl & WithAppProviderProps
  | PropsWithClick & WithAppProviderProps;

export class Item extends React.PureComponent<CombinedProps, State> {
  static contextTypes = contextTypes;
  static Handle = Handle;

  state: State = {
    actionsMenuVisible: false,
    focused: false,
    focusedInner: false,
  };

  private node: HTMLElement | null = null;

  componentDidMount() {
    const {subscribe} = this.context;
    subscribe(this.handleContextUpdate);
  }

  componentWillUnmount() {
    const {unsubscribe} = this.context;
    unsubscribe(this.handleContextUpdate);
  }

  render() {
    const {
      children,
      url,
      media,
      shortcutActions,
      ariaControls,
      ariaExpanded,
      persistActions = false,
      polaris: {intl},
      accessibilityLabel,
      onMouseEnter,
      onMouseLeave,
      id,
    } = this.props as CombinedProps;

    const {selectable, loading} = this.context;

    const {actionsMenuVisible, focused, focusedInner} = this.state;

    const selected = this.isSelected();

    let ownedMarkup: React.ReactNode = null;
    let handleMarkup: React.ReactNode = null;

    const mediaMarkup = media ? (
      <div className={styles.Media} testID="Media">
        {media}
      </div>
    ) : null;

    const checkboxAccessibilityLabel =
      accessibilityLabel || intl.translate('Polaris.Common.checkbox');

    if (selectable) {
      const label = selected
        ? intl.translate('Polaris.ResourceList.Item.deselectItem', {
            accessibilityLabel: checkboxAccessibilityLabel,
          })
        : intl.translate('Polaris.ResourceList.Item.selectItem', {
            accessibilityLabel: checkboxAccessibilityLabel,
          });

      handleMarkup = (
        <Handle
          label={label}
          checked={selected}
          disabled={loading}
          onClick={this.handleLargerSelectionArea}
          onChange={this.handleLargerSelectionArea}
        />
      );
    }

    if (media || selectable) {
      ownedMarkup = (
        <div className={styles.Owned} testID="LargerSelectionArea">
          {handleMarkup}
          {mediaMarkup}
        </div>
      );
    }

    const className = classNames(
      styles.Item,
      focused && styles.focused,
      selectable && styles.selectable,
      selected && styles.selected,
      persistActions && styles.persistActions,
      focusedInner && styles.focusedInner,
    );

    let actionsMarkup: React.ReactNode | null = null;
    let disclosureMarkup: React.ReactNode | null = null;

    if (shortcutActions && !loading) {
      if (persistActions) {
        actionsMarkup = (
          <div className={styles.Actions} onClick={stopPropagation}>
            <ButtonGroup>
              {buttonsFrom(shortcutActions, {
                size: 'slim',
                plain: true,
              })}
            </ButtonGroup>
          </div>
        );

        disclosureMarkup = (
          <div className={styles.Disclosure} onClick={stopPropagation}>
            <Popover
              activator={
                <Button
                  aria-label={intl.translate(
                    'Polaris.ResourceList.Item.actionsDropdown',
                  )}
                  onClick={this.handleActionsClick}
                  plain
                  icon="horizontalDots"
                />
              }
              onClose={this.handleCloseRequest}
              active={actionsMenuVisible}
            >
              <ActionList items={shortcutActions} />
            </Popover>
          </div>
        );
      } else {
        actionsMarkup = (
          <div className={styles.Actions} onClick={stopPropagation}>
            <ButtonGroup segmented testID="ShortcutActions">
              {buttonsFrom(shortcutActions, {
                size: 'slim',
              })}
            </ButtonGroup>
          </div>
        );
      }
    }

    const content = children ? (
      <div className={styles.Content}>{children}</div>
    ) : null;

    const containerMarkup = (
      <div
        testID="Item-Content"
        className={styles.Container}
        id={this.props.id}
      >
        {ownedMarkup}
        {content}
        {actionsMarkup}
        {disclosureMarkup}
      </div>
    );

    const tabIndex = loading ? -1 : 0;

    return (
      <div
        ref={this.setNode}
        className={className}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
        onKeyUp={this.handleKeypress}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        testID="Item-Wrapper"
      >
        <Accessible
          url={url}
          id={id}
          accessibilityLabel={accessibilityLabel}
          tabIndex={tabIndex}
          ariaControls={ariaControls}
          ariaExpanded={ariaExpanded}
          onClick={this.handleClick}
          onFocus={this.handleAnchorFocus}
          onBlur={this.handleFocusedBlur}
        />
        {containerMarkup}
      </div>
    );
  }

  @autobind
  private setNode(node: HTMLElement | null) {
    this.node = node;
  }

  @autobind
  private handleAnchorFocus() {
    this.setState({focused: true, focusedInner: false});
  }

  @autobind
  private handleFocusedBlur() {
    this.setState({focused: true, focusedInner: true});
  }

  @autobind
  private handleFocus() {
    const {onFocus} = this.props;

    if (onFocus) {
      onFocus();
    }
    this.setState({focused: true});
  }

  @autobind
  private handleBlur(event: React.FocusEvent<HTMLElement>) {
    const isInside = this.compareEventNode(event);
    if (
      this.node == null ||
      !this.node.contains(event.relatedTarget as HTMLElement)
    ) {
      const {onBlur} = this.props;

      if (onBlur) {
        onBlur();
      }
      this.setState({focused: false});
    } else if (isInside) {
      this.setState({focusedInner: true});
    }
  }

  @autobind
  private handleMouseDown() {
    this.setState({focusedInner: true});
  }

  @autobind
  private handleMouseUp(event: React.MouseEvent) {
    const {button} = event;

    if (button !== MouseButton.Auxiliary) {
      return;
    }

    window.open(this.props.url, '_blank');
  }

  @autobind
  private handleLargerSelectionArea(event: React.MouseEvent<any>) {
    stopPropagation(event);
    this.handleSelection(!this.isSelected(), event.nativeEvent.shiftKey);
  }

  @autobind
  private handleSelection(value: boolean, shiftKey?: boolean) {
    const {id, index} = this.props;
    const {onSelectionChange} = this.context;
    if (id == null || index == null || onSelectionChange == null) {
      return;
    }

    this.setState({focused: true, focusedInner: true});
    onSelectionChange(value, id, index, shiftKey);
  }

  @autobind
  private handleClick(event: React.MouseEvent<any>) {
    const {id, onClick, url} = this.props;
    const {ctrlKey, metaKey} = event.nativeEvent;
    const anchor = this.node && this.node.querySelector('a');

    const {selectMode} = this.context;

    if (selectMode) {
      this.handleLargerSelectionArea(event);
      return;
    }

    if (anchor === event.target) {
      return;
    }

    if (onClick) {
      onClick(id);
    }

    if (ctrlKey || metaKey) {
      window.open(url, '_blank');
      return;
    }

    if (url && anchor) {
      anchor.click();
    }
  }

  @autobind
  private handleKeypress(event: React.KeyboardEvent<HTMLElement>) {
    const {onClick = noop} = this.props;
    const {selectMode} = this.context;
    const {key} = event;

    if (key === 'Enter' && !selectMode) {
      onClick();
    }
  }

  @autobind
  private handleContextUpdate() {
    this.forceUpdate();
  }

  @autobind
  private handleActionsClick() {
    this.setState(({actionsMenuVisible}) => ({
      actionsMenuVisible: !actionsMenuVisible,
    }));
  }

  @autobind
  private handleCloseRequest() {
    this.setState({actionsMenuVisible: false});
  }

  private isSelected() {
    const {id} = this.props;
    const {selectedItems} = this.context;
    return (
      selectedItems &&
      ((Array.isArray(selectedItems) && selectedItems.includes(id)) ||
        selectedItems === SELECT_ALL_ITEMS)
    );
  }

  private compareEventNode(event: React.FocusEvent<HTMLElement>) {
    return this.props.onClick
      ? event.target === this.node
      : (event.target as HTMLElement).tagName.toLowerCase() === 'a';
  }
}

function stopPropagation(event: React.MouseEvent<any>) {
  event.stopPropagation();
}

export default withAppProvider<PropsWithUrl | PropsWithClick>()(Item);
