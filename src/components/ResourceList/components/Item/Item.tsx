import * as React from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';
import {classNames} from '@shopify/react-utilities/styles';
import {createUniqueIDFactory, noop} from '@shopify/javascript-utilities/other';
import compose from '@shopify/react-compose';
import isEqual from 'lodash/isEqual';
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

import {
  ResourceListContext,
  SELECT_ALL_ITEMS,
  SelectedItems,
} from '../../types';
import withContext from '../../../WithContext';
import {Consumer} from '../Context';
import styles from './Item.scss';

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
  selected: boolean;
}

export type CombinedProps =
  | PropsWithUrl & WithAppProviderProps & WithContextTypes<ResourceListContext>
  | PropsWithClick &
      WithAppProviderProps &
      WithContextTypes<ResourceListContext>;

const getUniqueCheckboxID = createUniqueIDFactory('ResourceListItemCheckbox');
const getUniqueOverlayID = createUniqueIDFactory('ResourceListItemOverlay');

export class Item extends React.Component<CombinedProps, State> {
  static getDerivedStateFromProps(nextProps: CombinedProps, prevState: State) {
    const selected = isSelected(nextProps.id, nextProps.context.selectedItems);

    if (prevState.selected === selected) {
      return null;
    }

    return {selected};
  }

  state: State = {
    actionsMenuVisible: false,
    focused: false,
    focusedInner: false,
    selected: isSelected(this.props.id, this.props.context.selectedItems),
  };

  private node: HTMLDivElement | null = null;
  private checkboxId = getUniqueCheckboxID();
  private overlayId = getUniqueOverlayID();
  private buttonOverlay = React.createRef<HTMLButtonElement>();

  shouldComponentUpdate(nextProps: CombinedProps, nextState: State) {
    const {
      context: {selectedItems: nextSelectedItems, ...restNextContext},
      ...restNextProps
    } = nextProps;
    const {
      context: {selectedItems, ...restContext},
      ...restProps
    } = this.props;

    const nextSelectMode = nextProps.context.selectMode;
    return (
      !isEqual(this.state, nextState) ||
      this.props.context.selectMode !== nextSelectMode ||
      (!nextProps.context.selectMode &&
        (!isEqual(restProps, restNextProps) ||
          !isEqual(restContext, restNextContext)))
    );
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
      context: {selectable, selectMode, loading},
    } = this.props;

    const {actionsMenuVisible, focused, focusedInner, selected} = this.state;

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
                  icon={HorizontalDotsMinor}
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

    const accessibleMarkup = url ? (
      <UnstyledLink
        aria-describedby={this.props.id}
        aria-label={accessibilityLabel}
        className={styles.Link}
        url={url}
        tabIndex={tabIndex}
        id={this.overlayId}
      />
    ) : (
      <button
        className={styles.Button}
        aria-label={accessibilityLabel}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        onClick={this.handleClick}
        tabIndex={tabIndex}
        ref={this.buttonOverlay}
      />
    );

    return (
      <div
        ref={this.setNode}
        className={className}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyUp={this.handleKeypress}
        testID="Item-Wrapper"
        data-href={url}
      >
        {accessibleMarkup}
        {containerMarkup}
      </div>
    );
  }

  private setNode = (node: HTMLDivElement | null) => {
    this.node = node;
  };

  private handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (
      event.target === this.buttonOverlay.current ||
      (this.node &&
        event.target === this.node.querySelector(`#${this.overlayId}`))
    ) {
      this.setState({focused: true, focusedInner: false});
    } else if (this.node && this.node.contains(event.target)) {
      this.setState({focused: true, focusedInner: true});
    }
  };

  private handleBlur = ({relatedTarget}: React.FocusEvent) => {
    if (
      this.node &&
      relatedTarget instanceof Element &&
      this.node.contains(relatedTarget)
    ) {
      return;
    }

    this.setState({focused: false, focusedInner: false});
  };

  private handleLargerSelectionArea = (event: React.MouseEvent<any>) => {
    stopPropagation(event);
    this.handleSelection(!this.state.selected);
  };

  private handleSelection = (value: boolean) => {
    const {
      id,
      context: {onSelectionChange},
    } = this.props;
    if (id == null || onSelectionChange == null) {
      return;
    }
    onSelectionChange(value, id);
  };

  private handleClick = (event: React.MouseEvent<any>) => {
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
  };

  private handleKeypress = (event: React.KeyboardEvent<HTMLElement>) => {
    const {
      onClick = noop,
      context: {selectMode},
    } = this.props;
    const {key} = event;

    if (key === 'Enter' && !selectMode) {
      onClick();
    }
  };

  private handleActionsClick = () => {
    this.setState(({actionsMenuVisible}) => ({
      actionsMenuVisible: !actionsMenuVisible,
    }));
  };

  private handleCloseRequest = () => {
    this.setState({actionsMenuVisible: false});
  };
}

function stopPropagation(event: React.MouseEvent<any>) {
  event.stopPropagation();
}

function isSelected(id: string, selectedItems?: SelectedItems) {
  return Boolean(
    selectedItems &&
      ((Array.isArray(selectedItems) && selectedItems.includes(id)) ||
        selectedItems === SELECT_ALL_ITEMS),
  );
}

export default compose<Props>(
  withContext<Props, WithAppProviderProps, ResourceListContext>(Consumer),
  withAppProvider<Props>(),
)(Item);
