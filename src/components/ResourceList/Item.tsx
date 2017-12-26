import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {isElementOfType} from '@shopify/react-utilities/components';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import {Action, DisableableAction} from '../../types';
import ActionList from '../ActionList';
import Popover from '../Popover';
import Avatar, {Props as AvatarProps} from '../Avatar';
import UnstyledLink from '../UnstyledLink';
import Thumbnail, {Props as ThumbnailProps} from '../Thumbnail';
import ButtonGroup from '../ButtonGroup';
import Button, {buttonsFrom} from '../Button';
import Badge, {Status} from '../Badge';

import * as styles from './ResourceList.scss';

export type ExceptionStatus = 'neutral' | 'warning' | 'critical';
export type MediaSize = 'small' | 'medium' | 'large';
export type MediaType = 'avatar' | 'thumbnail';

export interface BadgeDescriptor {
  status: Status,
  content: string,
}

export interface ExceptionDescriptor {
  status?: ExceptionStatus,
  title?: string,
  description?: string,
}

export interface Props {
  url?: string,
  onAction?: Action['onAction'],
  media?: React.ReactElement<AvatarProps | ThumbnailProps>,
  attributeOne: string,
  attributeTwo?: React.ReactNode,
  attributeThree?: React.ReactNode,
  badges?: BadgeDescriptor[],
  exceptions?: ExceptionDescriptor[],
  actions?: DisableableAction[],
  persistActions?: boolean,
}

export interface State {
  actionsMenuVisible: boolean,
  focused: boolean,
}

const getUniqueID = createUniqueIDFactory('ResourceListItem');

export default class Item extends React.PureComponent<Props, State> {
  state: State = {
    actionsMenuVisible: false,
    focused: false,
  };

  private node: HTMLElement | null = null;
  private id = getUniqueID();

  render() {
    const {
      url,
      onAction,
      media,
      attributeOne,
      attributeTwo,
      attributeThree,
      badges,
      exceptions,
      actions,
      persistActions = false,
    } = this.props;

    const {actionsMenuVisible, focused} = this.state;

    const attributeTwoMarkup = attributeTwo
      ? <div className={styles.AttributeTwo}>{attributeTwo}</div>
      : null;

    const badgeMarkup = badges
      ? <div className={styles.Badge}>{badges.map(renderBadge)}</div>
      : null;

    const attributeThreeMarkup = attributeThree
      ? <div className={styles.AttributeThree}>{attributeThree}</div>
      : null;

    const exceptionsMarkup = exceptions
      ? <ul className={styles.ExceptionList}>{exceptions.map(renderException)}</ul>
      : null;

    let mediaSize: MediaSize | null = null;
    let mediaType: MediaType | null = null;
    let mediaMarkup: React.ReactNode = null;

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

    const className = classNames(
      styles.Item,
      url && styles['Item-link'],
      focused && styles['Item-focused'],
      persistActions && styles['Item-persistActions'],
      mediaType && styles[variationName('Item-media', mediaType)],
      mediaSize && styles[variationName('Item-size', mediaSize)],
    );

    let actionsMarkup: React.ReactNode | null = null;
    let disclosureMarkup: React.ReactNode | null = null;

    if (actions) {
      if (persistActions) {
        actionsMarkup = (
          <div className={styles.Actions}>
            <ButtonGroup>
              {buttonsFrom(actions, {size: 'slim', plain: true})}
            </ButtonGroup>
          </div>
        );

        disclosureMarkup = (
          <div className={styles.Disclosure}>
            <Popover
              activator={<Button aria-label="Actions dropdown" onClick={this.handleClick} plain icon="horizontalDots" />}
              onClose={this.handleCloseRequest}
              active={actionsMenuVisible}
            >
              <ActionList items={actions} />
            </Popover>
          </div>
        );
      } else {
        actionsMarkup = (
          <div className={styles.Actions}>
            <ButtonGroup segmented>
              {buttonsFrom(actions, {size: 'slim'})}
            </ButtonGroup>
          </div>
        );
      }
    }

    const containerMarkup = (
      <div className={styles.Container} id={this.id}>
        {mediaMarkup}
        <div className={styles.Content}>
          <div className={styles.Attributes}>
            <p className={styles.AttributeOne}>
              {attributeOne}
            </p>
            {attributeTwoMarkup}
            {badgeMarkup}
            {attributeThreeMarkup}
          </div>
          {exceptionsMarkup}
        </div>
        {actionsMarkup}
        {disclosureMarkup}
      </div>
    );

    return url || onAction
      ? (
        <div
          ref={this.setNode}
          className={className}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
        >
          <UnstyledLink
            aria-describedby={this.id}
            className={styles.Link}
            url={url ? url : '#'}
            onClick={onAction}
          />
          {containerMarkup}
        </div>
      )
      : (
        <div
          ref={this.setNode}
          className={className}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
        >
          {containerMarkup}
        </div>
      );
  }

  @autobind
  private setNode(node: HTMLElement | null) {
    this.node = node;
  }

  @autobind
  private handleFocus() {
    this.setState({focused: true});
  }

  @autobind
  private handleBlur(event: React.FocusEvent<HTMLElement>) {
    if (this.node == null || !this.node.contains(event.relatedTarget as HTMLElement)) {
      this.setState({focused: false});
    }
  }

  @autobind
  private mouseEnter() {
    this.setState({focused: true});
  }

  @autobind
  private mouseLeave() {
    this.setState({focused: false});
  }

  @autobind
  private handleClick() {
    this.setState({actionsMenuVisible: true});
  }

  @autobind
  private handleCloseRequest() {
    this.setState({actionsMenuVisible: false});
  }
}

function renderBadge(badge: BadgeDescriptor) {
  return <Badge key={badge.content} status={badge.status}>{badge.content}</Badge>;
}

function renderException(exception: ExceptionDescriptor, index: number) {
  const {status, title, description} = exception;
  const className = classNames(
    styles.ExceptionItem,
    status && styles[variationName('ExceptionItem-status', status)],
  );

  const titleMarkup = title != null
    ? <div className={styles.Title}>{title}</div>
    : null;

  const descriptionMarkup = description != null
    ? <div className={styles.Description}>{description}</div>
    : null;

  return (
    <li key={index} className={className}>
      {titleMarkup}
      {descriptionMarkup}
    </li>
  );
}
