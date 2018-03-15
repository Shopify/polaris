import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {isElementOfType} from '@shopify/react-utilities/components';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {noop} from '@shopify/javascript-utilities/other';

import {DisableableAction} from '../../../../types';
import ActionList from '../../../ActionList';
import Popover from '../../../Popover';
import Avatar, {Props as AvatarProps} from '../../../Avatar';
import UnstyledLink from '../../../UnstyledLink';
import Thumbnail, {Props as ThumbnailProps} from '../../../Thumbnail';
import ButtonGroup from '../../../ButtonGroup';
import Checkbox from '../../../Checkbox';
import Button, {buttonsFrom} from '../../../Button';
import {contextTypes, SELECT_ALL_ITEMS} from '../../types';
import {withProvider, WithProviderProps} from '../../../Provider';

import * as styles from './Item.scss';

export type ExceptionStatus = 'neutral' | 'warning' | 'critical';
export type MediaSize = 'small' | 'medium' | 'large';
export type MediaType = 'avatar' | 'thumbnail';

export interface GenericProps extends WithProviderProps {
  id: string,
  media?: React.ReactElement<AvatarProps | ThumbnailProps>,
  shortcutActions?: DisableableAction[],
  children?: React.ReactNode,
}

export interface PropsWithUrl extends GenericProps {
  url: string,
  onClick?(id?: string): void,
}

export interface PropsWithClick extends GenericProps {
  url?: string,
  onClick(id?: string): void,
}

export interface State {
  actionsMenuVisible: boolean,
  focused: boolean,
  focusedInner: boolean,
}

export type CombinedProps = PropsWithUrl | PropsWithClick;

const getUniqueID = createUniqueIDFactory('ResourceListItem');
const getUniqueCheckboxID = createUniqueIDFactory('ResourceListItemCheckbox');

export class Item extends React.PureComponent<CombinedProps, State> {
  static contextTypes = contextTypes;

  state: State = {
    actionsMenuVisible: false,
    focused: false,
    focusedInner: false,
  };

  private node: HTMLElement | null = null;
  private id = getUniqueID();
  private checkboxId = getUniqueCheckboxID();

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
      polaris: {intl},
    } = this.props;

    const {
      persistActions = false,
      selectable,
      selectMode,
    } = this.context;

    const {
      actionsMenuVisible,
      focused,
      focusedInner,
    } = this.state;

    const selected = this.isSelected();

    let mediaSize: MediaSize | null = null;
    let mediaType: MediaType | null = null;
    let mediaMarkup: React.ReactNode = null;
    let ownedMarkup: React.ReactNode = null;
    let handleMarkup: React.ReactNode = null;

    if (media) {
      if (isElementOfType(media, Avatar as React.ComponentType)) {
        mediaSize = media.props.size || 'medium';
        mediaType = 'avatar';
      }

      if (isElementOfType(media, Thumbnail as React.ComponentType)) {
        mediaSize = media.props.size || 'medium';
        mediaType = 'thumbnail';
      }

      mediaMarkup = (
        <div className={styles.Media}>
          {media}
        </div>
      );
    }

    if (selectable) {
      handleMarkup = (
        <div className={styles.Handle} onClick={this.handleLargerSelectionArea}>
          <span onClick={stopPropagation} className={styles.CheckboxWrapper}>
            <Checkbox
              id={this.checkboxId}
              label={intl.translate('Polaris.ResourceList.Item.selectItem')}
              labelHidden
              onChange={this.handleSelection}
              checked={selected}
            />
          </span>
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
      focused && styles['Item-focused'],
      selectable && styles['Item-selectable'],
      selected && styles['Item-selected'],
      selectMode && styles['Item-selectMode'],
      persistActions && styles['Item-persistActions'],
      focusedInner && styles['Item-focusedInner'],
      mediaType && styles[variationName('Item-media', mediaType)],
      mediaSize && styles[variationName('Item-size', mediaSize)],
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
              activator={<Button aria-label={intl.translate('Polaris.ResourceList.Item.actionsDropdown')} onClick={this.handleActionsClick} plain icon="horizontalDots" />}
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
              {buttonsFrom(shortcutActions, {size: 'slim'})}
            </ButtonGroup>
          </div>
        );
      }
    }

    const content = children
      ? (
        <div className={styles.Content}>
          {children}
        </div>
      )
      : null;

    const containerMarkup = (
      <div className={styles.Container} id={this.id}>
        {ownedMarkup}
        {content}
        {actionsMarkup}
        {disclosureMarkup}
      </div>
    );

    const urlMarkup = url
      ? (
        <UnstyledLink
          aria-describedby={this.id}
          className={styles.Link}
          url={url}
          onFocus={this.handleAnchorFocus}
          onBlur={this.handleFocusedBlur}
        />
      )
      : null;

    const tabIndex = url ? -1 : 0;
    const role = url ? undefined : 'button';

    return (
      <div
        ref={this.setNode}
        className={className}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        onKeyUp={this.handleKeypress}
        tabIndex={tabIndex}
        role={role}
        testID="Item-Wrapper"
      >
        {urlMarkup}
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
  private handleMouseDown() {
    this.setState({focusedInner: true});
  }

  @autobind
  private handleBlur(event: React.FocusEvent<HTMLElement>) {
    const isInside = this.compareEventNode(event);
    if (this.node == null || !this.node.contains(event.relatedTarget as HTMLElement)) {
      this.setState({focused: false, focusedInner: false});
    } else if (isInside) {
      this.setState({focusedInner: true});
    }
  }

  @autobind
  private handleLargerSelectionArea(event: React.MouseEvent<any>) {
    stopPropagation(event);
    this.handleSelection(!this.isSelected());
  }

  @autobind
  private handleSelection(value: boolean) {
    const {id} = this.props;
    const {onSelectionChange} = this.context;
    if (id == null || onSelectionChange == null) { return; }
    this.setState({focused: true, focusedInner: true});
    onSelectionChange(value, id);
  }

  @autobind
  private handleClick(event: React.MouseEvent<any>) {
    const {id, onClick, url} = this.props;
    const anchor = this.node && this.node.querySelector('a');
    const {selectMode} = this.context;

    if (selectMode) {
      this.handleLargerSelectionArea(event);
      return;
    }

    if (anchor === event.target) { return; }

    if (onClick) {
      onClick(id);
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
    this.setState({actionsMenuVisible: true});
  }

  @autobind
  private handleCloseRequest() {
    this.setState({actionsMenuVisible: false});
  }

  private isSelected() {
    const {id} = this.props;
    const {selectedItems} = this.context;
    return selectedItems && ((Array.isArray(selectedItems) && selectedItems.includes(id)) || selectedItems === SELECT_ALL_ITEMS);
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

export default withProvider()(Item);
