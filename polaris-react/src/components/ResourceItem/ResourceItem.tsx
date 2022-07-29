import type {
  ReactNode,
  ReactElement,
  ContextType,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import {Component, createRef, useContext} from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';
import isEqual from 'react-fast-compare';

import {classNames, variationName} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import type {DisableableAction} from '../../types';
import {ActionList} from '../ActionList';
import {Popover} from '../Popover';
import type {AvatarProps} from '../Avatar';
import {UnstyledLink} from '../UnstyledLink';
import type {ThumbnailProps} from '../Thumbnail';
import {ButtonGroup} from '../ButtonGroup';
import {Checkbox} from '../Checkbox';
import {Button, buttonsFrom} from '../Button';
import {
  ResourceListContext,
  SELECT_ALL_ITEMS,
  ResourceListSelectedItems,
} from '../../utilities/resource-list';
import {globalIdGeneratorFactory} from '../../utilities/unique-id';

import styles from './ResourceItem.scss';

type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';

interface BaseProps {
  /** Visually hidden text for screen readers used for item link*/
  accessibilityLabel?: string;
  /** Individual item name used by various text labels */
  name?: string;
  /** Id of the element the item onClick controls */
  ariaControls?: string;
  /** Tells screen reader the controlled element is expanded */
  ariaExpanded?: boolean;
  /** Unique identifier for the item */
  id: string;
  /** Content for the media area at the left of the item, usually an Avatar or Thumbnail */
  media?: ReactElement<AvatarProps | ThumbnailProps>;
  /** Makes the shortcut actions always visible */
  persistActions?: boolean;
  /** 1 or 2 shortcut actions; must be available on the page linked to by url */
  shortcutActions?: DisableableAction[];
  /** The order the item is rendered */
  sortOrder?: number;
  /** URL for the resource’s details page (required unless onClick is provided) */
  url?: string;
  /** Allows url to open in a new tab */
  external?: boolean;
  /** Callback when clicked (required if url is omitted) */
  onClick?(id?: string): void;
  /** Content for the details area */
  children?: ReactNode;
  /** Adjust vertical alignment of elements */
  verticalAlignment?: Alignment;
  /** Prefetched url attribute to bind to the main element being returned */
  dataHref?: string;
}

interface PropsWithUrl extends BaseProps {
  url: string;
  onClick?(id?: string): void;
}

interface PropsWithClick extends BaseProps {
  url?: string;
  onClick(id?: string): void;
}

export type ResourceItemProps = PropsWithUrl | PropsWithClick;

interface PropsFromWrapper {
  context: ContextType<typeof ResourceListContext>;
  i18n: ReturnType<typeof useI18n>;
}

interface State {
  actionsMenuVisible: boolean;
  focused: boolean;
  focusedInner: boolean;
  selected: boolean;
}

type CombinedProps = PropsFromWrapper & (PropsWithUrl | PropsWithClick);

const getUniqueCheckboxID = globalIdGeneratorFactory(
  'ResourceListItemCheckbox',
);
const getUniqueOverlayID = globalIdGeneratorFactory('ResourceListItemOverlay');

class BaseResourceItem extends Component<CombinedProps, State> {
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
  private buttonOverlay = createRef<HTMLButtonElement>();

  shouldComponentUpdate(nextProps: CombinedProps, nextState: State) {
    const {
      children: nextChildren,
      context: {selectedItems: nextSelectedItems, ...restNextContext},
      ...restNextProps
    } = nextProps;

    const {
      children,
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
      external,
      media,
      shortcutActions,
      ariaControls,
      ariaExpanded,
      persistActions = false,
      accessibilityLabel,
      name,
      context: {selectable, selectMode, loading, resourceName},
      i18n,
      verticalAlignment,
      dataHref,
    } = this.props;

    const {actionsMenuVisible, focused, focusedInner, selected} = this.state;

    let ownedMarkup: ReactNode = null;
    let handleMarkup: ReactNode = null;

    const mediaMarkup = media ? (
      <div className={styles.Media}>{media}</div>
    ) : null;

    if (selectable) {
      const checkboxAccessibilityLabel =
        name || accessibilityLabel || i18n.translate('Polaris.Common.checkbox');

      handleMarkup = (
        <div className={styles.Handle} onClick={this.handleLargerSelectionArea}>
          <div onClick={stopPropagation} className={styles.CheckboxWrapper}>
            <div onChange={this.handleLargerSelectionArea}>
              <Checkbox
                id={this.checkboxId}
                label={checkboxAccessibilityLabel}
                labelHidden
                checked={selected}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      );
    }

    if (media || selectable) {
      ownedMarkup = (
        <div
          className={classNames(
            styles.Owned,
            !mediaMarkup && styles.OwnedNoMedia,
          )}
        >
          {handleMarkup}
          {mediaMarkup}
        </div>
      );
    }

    const className = classNames(
      styles.ResourceItem,
      focused && styles.focused,
      selectable && styles.selectable,
      selected && styles.selected,
      selectMode && styles.selectMode,
      persistActions && styles.persistActions,
      focusedInner && styles.focusedInner,
    );

    const listItemClassName = classNames(
      styles.ListItem,
      focused && !focusedInner && styles.focused,
    );

    let actionsMarkup: ReactNode | null = null;
    let disclosureMarkup: ReactNode | null = null;

    if (shortcutActions && !loading) {
      if (persistActions) {
        actionsMarkup = (
          <div className={styles.Actions} onClick={stopPropagation}>
            <ButtonGroup>
              {buttonsFrom(shortcutActions, {
                plain: true,
              })}
            </ButtonGroup>
          </div>
        );

        const disclosureAccessibilityLabel = name
          ? i18n.translate('Polaris.ResourceList.Item.actionsDropdownLabel', {
              accessibilityLabel: name,
            })
          : i18n.translate('Polaris.ResourceList.Item.actionsDropdown');

        disclosureMarkup = (
          <div className={styles.Disclosure} onClick={stopPropagation}>
            <Popover
              activator={
                <Button
                  accessibilityLabel={disclosureAccessibilityLabel}
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
            <ButtonGroup segmented>
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

    const containerClassName = classNames(
      styles.Container,
      verticalAlignment &&
        styles[variationName('alignment', verticalAlignment)],
    );

    const containerMarkup = (
      <div className={containerClassName} id={this.props.id}>
        {ownedMarkup}
        {content}
        {actionsMarkup}
        {disclosureMarkup}
      </div>
    );

    const tabIndex = loading ? -1 : 0;

    const ariaLabel =
      accessibilityLabel ||
      i18n.translate('Polaris.ResourceList.Item.viewItem', {
        itemName: name || (resourceName && resourceName.singular) || '',
      });

    const accessibleMarkup = url ? (
      <UnstyledLink
        aria-describedby={this.props.id}
        aria-label={ariaLabel}
        className={styles.Link}
        url={url}
        external={external}
        tabIndex={tabIndex}
        id={this.overlayId}
      />
    ) : (
      <button
        className={styles.Button}
        aria-label={ariaLabel}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        onClick={this.handleClick}
        tabIndex={tabIndex}
        ref={this.buttonOverlay}
      />
    );

    return (
      <li className={listItemClassName} data-href={dataHref}>
        <div className={styles.ItemWrapper}>
          <div
            ref={this.setNode}
            className={className}
            onClick={this.handleClick}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyUp={this.handleKeyUp}
            onMouseOut={this.handleMouseOut}
            data-href={url}
          >
            {accessibleMarkup}
            {containerMarkup}
          </div>
        </div>
      </li>
    );
  }

  private setNode = (node: HTMLDivElement | null) => {
    this.node = node;
  };

  private handleFocus = (event: FocusEvent<HTMLElement>) => {
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

  private handleBlur = ({relatedTarget}: FocusEvent) => {
    if (
      this.node &&
      relatedTarget instanceof Element &&
      this.node.contains(relatedTarget)
    ) {
      return;
    }

    this.setState({focused: false, focusedInner: false});
  };

  private handleMouseOut = () => {
    this.state.focused && this.setState({focused: false, focusedInner: false});
  };

  private handleLargerSelectionArea = (event: MouseEvent<any>) => {
    stopPropagation(event);
    this.handleSelection(!this.state.selected, event.nativeEvent.shiftKey);
  };

  private handleSelection = (value: boolean, shiftKey: boolean) => {
    const {
      id,
      sortOrder,
      context: {onSelectionChange},
    } = this.props;

    if (id == null || onSelectionChange == null) {
      return;
    }

    this.setState({focused: value, focusedInner: value});
    onSelectionChange(value, id, sortOrder, shiftKey);
  };

  private handleClick = (event: MouseEvent<any>) => {
    stopPropagation(event);
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

  // This fires onClick when there is a URL on the item
  private handleKeyUp = (event: KeyboardEvent<HTMLElement>) => {
    const {
      onClick = noop,
      context: {selectMode},
    } = this.props;
    const {key} = event;

    if (key === 'Enter' && this.props.url && !selectMode) {
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

function noop() {}

function stopPropagation(event: MouseEvent<any>) {
  event.stopPropagation();
}

function isSelected(id: string, selectedItems?: ResourceListSelectedItems) {
  return Boolean(
    selectedItems &&
      ((Array.isArray(selectedItems) && selectedItems.includes(id)) ||
        selectedItems === SELECT_ALL_ITEMS),
  );
}

export function ResourceItem(props: ResourceItemProps) {
  return (
    <BaseResourceItem
      {...props}
      context={useContext(ResourceListContext)}
      i18n={useI18n()}
    />
  );
}
