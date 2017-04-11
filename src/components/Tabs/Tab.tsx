import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {classNames} from '@shopify/react-utilities/styles';

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
};

export default class Tab extends React.PureComponent<Props, {}> {
  componentDidUpdate() {
    const {focused, measuring} = this.props;
    if (focused && !measuring) {
      (findDOMNode(this) as HTMLElement).focus();
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
      selected && styles.selected,
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
        role="tab"
        url={url}
        tabIndex={tabIndex}
        onClick={handleClick}
        className={className}
      >
        <div
          className={styles.Title}
          aria-selected={selected}
          aria-controls={panelID || null}
        >
          {children}
        </div>
      </UnstyledLink>
      )
      : (
        <button
          id={id}
          role="tab"
          tabIndex={tabIndex}
          className={className}
          onClick={handleClick}
        >
          <div
            className={styles.Title}
            aria-selected={selected}
            aria-controls={panelID || null}
          >
            {children}
          </div>
        </button>
      );

    return markup;
  }
}
