import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {autobind} from '@shopify/javascript-utilities/decorators';

import styles from '../../Tabs.scss';
import UnstyledLink from '../../../UnstyledLink';

export interface Props {
  id: string;
  focused: boolean;
  panelID?: string;
  children?: React.ReactNode;
  url?: string;
  accessibilityLabel?: string;
  onClick?(): void;
}

export default class Item extends React.PureComponent<Props, never> {
  private focusedNode: HTMLElement | React.ReactElement<any> | null = null;

  componentDidMount() {
    const {focusedNode} = this;
    const {focused} = this.props;

    if (focusedNode && focusedNode instanceof HTMLElement && focused) {
      focusedNode.focus();
    }
  }

  componentDidUpdate() {
    const {focusedNode} = this;
    const {focused} = this.props;

    if (focusedNode && focusedNode instanceof HTMLElement && focused) {
      focusedNode.focus();
    }
  }

  render() {
    const {
      id,
      panelID,
      children,
      url,
      accessibilityLabel,
      onClick = noop,
    } = this.props;

    const sharedProps = {
      id,
      ref: this.setFocusedNode,
      onClick,
      className: styles.Item,
      'aria-controls': panelID,
      'aria-selected': false,
      'aria-label': accessibilityLabel,
    };

    const markup = url ? (
      React.createElement(UnstyledLink, {url, ...sharedProps}, children)
    ) : (
      <button {...sharedProps} type="button">
        {children}
      </button>
    );

    return <li role="presentation">{markup}</li>;
  }

  @autobind
  private setFocusedNode(node: HTMLElement | React.ReactElement<any> | null) {
    this.focusedNode = node;
  }
}
