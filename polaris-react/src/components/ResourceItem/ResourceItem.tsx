import React, {Component, createRef, useContext, useId} from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';
import isEqual from 'react-fast-compare';

import {ActionList} from '../ActionList';
import {Box} from '../Box';
import {Bleed} from '../Bleed';
import {Button, buttonsFrom} from '../Button';
import {ButtonGroup} from '../ButtonGroup';
import {Checkbox} from '../Checkbox';
import {HorizontalGrid} from '../HorizontalGrid';
import {HorizontalStack} from '../HorizontalStack';
import type {HorizontalStackProps} from '../HorizontalStack';
import {Popover} from '../Popover';
import {UnstyledLink} from '../UnstyledLink';
import type {AvatarProps} from '../Avatar';
import type {DisableableAction} from '../../types';
import type {ThumbnailProps} from '../Thumbnail';
import {useBreakpoints} from '../../utilities/breakpoints';
import type {BreakpointsDirectionAlias} from '../../utilities/breakpoints';
import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {UseFeatures} from '../../utilities/features';
import {
  ResourceListContext,
  SELECT_ALL_ITEMS,
} from '../../utilities/resource-list';
import type {ResourceListSelectedItems} from '../../utilities/resource-list';

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
  media?: React.ReactElement<AvatarProps | ThumbnailProps>;
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
  children?: React.ReactNode;
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
type BreakpointsMatches = {
  [DirectionAlias in BreakpointsDirectionAlias]: boolean;
};
interface PropsFromWrapper {
  breakpoints?: BreakpointsMatches;
  context: React.ContextType<typeof ResourceListContext>;
  i18n: ReturnType<typeof useI18n>;
}

interface State {
  actionsMenuVisible: boolean;
  focused: boolean;
  focusedInner: boolean;
  selected: boolean;
}

type CombinedProps = PropsFromWrapper & (PropsWithUrl | PropsWithClick);

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
  private overlayRef = createRef<HTMLAnchorElement>();
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
      context: {selectable, selectMode, hasBulkActions, loading, resourceName},
      i18n,
      verticalAlignment,
      dataHref,
      breakpoints,
    } = this.props;

    const {actionsMenuVisible, focused, focusedInner, selected} = this.state;

    let ownedMarkup: React.ReactNode = null;
    let handleMarkup: React.ReactNode = null;

    if (selectable) {
      const checkboxAccessibilityLabel =
        name || accessibilityLabel || i18n.translate('Polaris.Common.checkbox');

      handleMarkup = (
        <UseFeatures>
          {({polarisSummerEditions2023}) => (
            <div onClick={this.handleLargerSelectionArea}>
              <Bleed marginBlock="2" marginInline="3">
                <Box
                  zIndex="var(--pc-resource-item-content-stacking-order)"
                  paddingInlineStart="3"
                  paddingInlineEnd="3"
                  paddingBlockStart={polarisSummerEditions2023 ? '2' : '3'}
                  paddingBlockEnd="2"
                >
                  <div onClick={stopPropagation}>
                    <div onChange={this.handleLargerSelectionArea}>
                      <UseId>
                        {(id) => (
                          <Checkbox
                            id={id}
                            label={checkboxAccessibilityLabel}
                            labelHidden
                            checked={selected}
                            disabled={loading}
                          />
                        )}
                      </UseId>
                    </div>
                  </div>
                </Box>
              </Bleed>
            </div>
          )}
        </UseFeatures>
      );
    }

    if (media || selectable) {
      ownedMarkup = (
        <UseFeatures>
          {({polarisSummerEditions2023}) => (
            <HorizontalStack
              gap={polarisSummerEditions2023 ? '3' : '4'}
              blockAlign={
                media && selectable ? 'center' : getAlignment(verticalAlignment)
              }
            >
              {handleMarkup}
              {media}
            </HorizontalStack>
          )}
        </UseFeatures>
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
      hasBulkActions && styles.hasBulkActions,
    );

    let actionsMarkup: React.ReactNode | null = null;
    let disclosureMarkup: React.ReactNode | null = null;

    if (shortcutActions && !loading) {
      if (persistActions) {
        actionsMarkup = breakpoints?.lgUp ? (
          <div className={styles.Actions} onClick={stopPropagation}>
            <ButtonGroup>
              {buttonsFrom(shortcutActions, {plain: true})}
            </ButtonGroup>
          </div>
        ) : null;

        const disclosureAccessibilityLabel = name
          ? i18n.translate('Polaris.ResourceList.Item.actionsDropdownLabel', {
              accessibilityLabel: name,
            })
          : i18n.translate('Polaris.ResourceList.Item.actionsDropdown');

        disclosureMarkup =
          !selectMode && breakpoints?.lgDown ? (
            <div onClick={stopPropagation}>
              <Popover
                activator={
                  <Button
                    accessibilityLabel={disclosureAccessibilityLabel}
                    onClick={this.handleActionsClick}
                    plain
                    primary
                    icon={HorizontalDotsMinor}
                  />
                }
                onClose={this.handleCloseRequest}
                active={actionsMenuVisible}
              >
                <ActionList items={shortcutActions} />
              </Popover>
            </div>
          ) : null;
      } else if (breakpoints?.lgUp) {
        actionsMarkup = (
          <div className={styles.Actions} onClick={stopPropagation}>
            <Box position="absolute" insetBlockStart="4" insetInlineEnd="5">
              <ButtonGroup segmented>
                {buttonsFrom(shortcutActions, {size: 'slim'})}
              </ButtonGroup>
            </Box>
          </div>
        );
      }
    }

    const containerMarkup = (
      <UseFeatures>
        {({polarisSummerEditions2023}) => (
          <Box
            id={this.props.id}
            position="relative"
            padding="3"
            paddingInlineStart={
              polarisSummerEditions2023 ? '3' : {xs: '4', sm: '5'}
            }
            paddingInlineEnd={
              polarisSummerEditions2023 ? '3' : {xs: '4', sm: '5'}
            }
            zIndex="var(--pc-resource-item-content-stacking-order)"
          >
            <HorizontalGrid columns={{xs: '1fr auto'}}>
              <HorizontalGrid
                columns={{xs: media || selectable ? 'auto 1fr' : '1fr'}}
                gap={polarisSummerEditions2023 ? '3' : '5'}
              >
                {ownedMarkup}
                <HorizontalStack
                  gap={polarisSummerEditions2023 ? '3' : '4'}
                  blockAlign={getAlignment(verticalAlignment)}
                >
                  <Box
                    width="100%"
                    padding="0"
                    paddingInlineStart="0"
                    paddingInlineEnd="0"
                  >
                    {children}
                  </Box>
                </HorizontalStack>
              </HorizontalGrid>
              {actionsMarkup}
              {disclosureMarkup}
            </HorizontalGrid>
          </Box>
        )}
      </UseFeatures>
    );

    const tabIndex = loading ? -1 : 0;

    const ariaLabel =
      accessibilityLabel ||
      i18n.translate('Polaris.ResourceList.Item.viewItem', {
        itemName: name || (resourceName && resourceName.singular) || '',
      });

    const accessibleMarkup = url ? (
      <UseId>
        {(id) => (
          <UnstyledLink
            aria-describedby={this.props.id}
            aria-label={ariaLabel}
            className={styles.Link}
            url={url}
            external={external}
            tabIndex={tabIndex}
            id={id}
            ref={this.overlayRef}
          />
        )}
      </UseId>
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

  private handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (
      event.target === this.buttonOverlay.current ||
      (this.node && event.target === this.overlayRef.current)
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

  private handleMouseOut = () => {
    this.state.focused && this.setState({focused: false, focusedInner: false});
  };

  private handleLargerSelectionArea = (event: React.MouseEvent<any>) => {
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

  private handleClick = (event: React.MouseEvent<any>) => {
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
  private handleKeyUp = (event: React.KeyboardEvent<HTMLElement>) => {
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

function stopPropagation(event: React.MouseEvent<any>) {
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
  const breakpoints = useBreakpoints();
  return (
    <BaseResourceItem
      {...props}
      breakpoints={breakpoints}
      context={useContext(ResourceListContext)}
      i18n={useI18n()}
    />
  );
}

function getAlignment(
  alignment?: Alignment,
): HorizontalStackProps['blockAlign'] {
  switch (alignment) {
    case 'leading':
      return 'start';
    case 'trailing':
      return 'end';
    case 'center':
      return 'center';
    case 'fill':
      return 'stretch';
    case 'baseline':
      return 'baseline';
    default:
      return 'start';
  }
}

function UseId(props: {children(id: string): JSX.Element}) {
  const id = useId();
  return props.children(id);
}
