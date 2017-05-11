import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {focusFirstFocusableNode, findFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import autobind from '@shopify/javascript-utilities/autobind';

import UnstyledLink from '../UnstyledLink';
import {TabDescriptor} from './Tabs';
import * as styles from './Tabs.scss';

export interface Props {
  id: string,
  selected: boolean,
  focused: boolean,
  siblingTabHasFocus: boolean,
  tab: TabDescriptor,
  panelID?: string,
  children?: React.ReactNode,
  url?: string,
  measuring?: boolean,
  onClick?(tab: TabDescriptor): void,
}

export default class Tab extends React.PureComponent<Props, never> {
  private node: HTMLElement;

  componentDidUpdate() {
    const {focused, measuring} = this.props;
    if (focused && !measuring) {
      focusFirstFocusableNode(this.node);
    }
  }

  render() {
    const {
      id,
      tab,
      focused,
      siblingTabHasFocus,
      children,
      onClick,
      selected,
      url,
      panelID,
      measuring,
    } = this.props;

    function handleClick() {
      if (onClick == null) { return; }
      onClick(tab);
    }

    const className = classNames(
      styles.Tab,
      selected && styles['Tab-selected'],
    );

    let tabIndex: 0 | -1;

    if (selected && !siblingTabHasFocus && !measuring) {
      tabIndex = 0;
    } else if (focused && !measuring) {
      tabIndex = 0;
    } else {
      tabIndex = -1;
    }

    const markup = url
      ? (
      <UnstyledLink
        id={id}
        url={url}
        tabIndex={tabIndex}
        onClick={handleClick}
        className={className}
      >
        <span
          className={styles.Title}
          aria-selected={selected}
          aria-controls={panelID || null}
        >
          {children}
        </span>
      </UnstyledLink>
      )
      : (
        <button
          id={id}
          tabIndex={tabIndex}
          className={className}
          onClick={handleClick}
        >
          <span
            className={styles.Title}
            aria-selected={selected}
            aria-controls={panelID || null}
          >
            {children}
          </span>
        </button>
      );

    return (
      <li
        role="tab"
        className={styles.TabContainer}
        ref={this.setNode}
        onMouseLeave={this.handleMouseLeave}
      >
        {markup}
      </li>
    );
  }

  @autobind
  private handleMouseLeave() {
    const firstFocusable = findFirstFocusableNode(this.node);
    if (firstFocusable) {
      firstFocusable.blur();
    }
  }

  @autobind
  private setNode(node: HTMLElement) {
    this.node = node;
  }
}
