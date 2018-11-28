import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory, noop} from '@shopify/javascript-utilities/other';
import compose from '@shopify/react-compose';
import {DisableableAction, WithContextTypes} from '../../../../types';
import ActionList from '../../../ActionList';
import Popover from '../../../Popover';
import {Props as AvatarProps} from '../../../Avatar';
import UnstyledLink from '../../../UnstyledLink';
import {Props as ThumbnailProps} from '../../../Thumbnail';
import ButtonGroup from '../../../ButtonGroup';
import Checkbox from '../../../Checkbox';
import Button, {buttonsFrom} from '../../../Button';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';

import {ResourceListContext, SELECT_ALL_ITEMS} from '../../types';
import withContext from '../../../WithContext';
import {Consumer} from '../Context';
import * as styles from './Item.scss';

export type ExceptionStatus = 'neutral' | 'warning' | 'critical';
export type MediaSize = 'small' | 'medium' | 'large';
export type MediaType = 'avatar' | 'thumbnail';

export interface BaseProps {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Id of the element the item onClick controls */
  ariaControls?: string;
  /** Tells screen reader the controlled element is expanded */
  ariaExpanded?: boolean;
  /** Unique identifier for the item */
  id: string;
  media?: React.ReactElement<AvatarProps | ThumbnailProps>;
  persistActions?: boolean;
  shortcutActions?: DisableableAction[];
  children?: React.ReactNode;
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
  | PropsWithUrl & WithAppProviderProps & WithContextTypes<ResourceListContext>
  | PropsWithClick &
      WithAppProviderProps &
      WithContextTypes<ResourceListContext>;

const getUniqueCheckboxID = createUniqueIDFactory('ResourceListItemCheckbox');

export class Item extends React.PureComponent<CombinedProps, State> {
  state: State = {
    actionsMenuVisible: false,
    focused: false,
    focusedInner: false,
  };

  private node: HTMLElement | null = null;
  private checkboxId = getUniqueCheckboxID();

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
      context: {selectable, selectMode, loading},
    } = this.props;

    const {actionsMenuVisible, focused, focusedInner} = this.state;

    const selected = this.isSelected();

    // let mediaMarkup: React.ReactNode = null;
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
        <div
          className={styles.Handle}
          onClick={this.handleLargerSelectionArea}
          testID="LargerSelectionArea"
        >
          <div onClick={stopPropagation} className={styles.CheckboxWrapper}>
            <Checkbox
              testID="Checkbox"
              id={this.checkboxId}
              label={label}
              labelHidden
              onChange={this.handleSelection}
              checked={selected}
              disabled={loading}
            />
          </div>
        </div>
      );
    }

    if (media || selectable) {
      ownedMarkup = (
        <div className={styles.Owned}>
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
      selectMode && styles.selectMode,
      persistActions && styles.persistActions,
      focusedInner && styles.focusedInner,
    );

    let actionsMarkup: React.ReactNode | null = null;
    let disclosureMarkup: React.ReactNode | null = null;

    if (shortcutActions) {
      if (persistActions) {
        actionsMarkup = (
          <div className={styles.Actions} onClick={stopPropagation}>
            <ButtonGroup>
              {buttonsFrom(shortcutActions, {size: 'slim', plain: true})}
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
              {buttonsFrom(shortcutActions, {size: 'slim'})}
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

    const accessibleMarkup = url ? (
      <UnstyledLink
        aria-describedby={this.props.id}
        aria-label={accessibilityLabel}
        className={styles.Link}
        url={url}
        onFocus={this.handleAnchorFocus}
        onBlur={this.handleFocusedBlur}
      />
    ) : (
      <button
        className={styles.Button}
        aria-label={accessibilityLabel}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        onClick={this.handleClick}
        onFocus={this.handleAnchorFocus}
        onBlur={this.handleFocusedBlur}
      />
    );

    return (
      <div
        ref={this.setNode}
        className={className}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseDown={this.handleMouseDown}
        onKeyUp={this.handleKeypress}
        testID="Item-Wrapper"
      >
        {accessibleMarkup}
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
    this.setState({focused: true});
  }

  @autobind
  private handleBlur(event: React.FocusEvent<HTMLElement>) {
    const isInside = this.compareEventNode(event);
    if (
      this.node == null ||
      !this.node.contains(event.relatedTarget as HTMLElement)
    ) {
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
  private handleLargerSelectionArea(event: React.MouseEvent<any>) {
    stopPropagation(event);
    this.handleSelection(!this.isSelected());
  }

  @autobind
  private handleSelection(value: boolean) {
    const {
      id,
      context: {onSelectionChange},
    } = this.props;
    if (id == null || onSelectionChange == null) {
      return;
    }
    this.setState({focused: true, focusedInner: true});
    onSelectionChange(value, id);
  }

  @autobind
  private handleClick(event: React.MouseEvent<any>) {
    const {
      id,
      onClick,
      url,
      context: {selectMode},
    } = this.props;
    const {ctrlKey, metaKey} = event.nativeEvent;
    const anchor = this.node && this.node.querySelector('a');

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

    if (url && (ctrlKey || metaKey)) {
      window.open(url, '_blank');
      return;
    }

    if (url && anchor) {
      anchor.click();
    }
  }

  @autobind
  private handleKeypress(event: React.KeyboardEvent<HTMLElement>) {
    const {
      onClick = noop,
      context: {selectMode},
    } = this.props;
    const {key} = event;

    if (key === 'Enter' && !selectMode) {
      onClick();
    }
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
    const {
      id,
      context: {selectedItems},
    } = this.props;
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

export default compose<Props>(
  withContext<Props, WithAppProviderProps, ResourceListContext>(Consumer),
  withAppProvider<Props>(),
)(Item);
