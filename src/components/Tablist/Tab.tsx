import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {classNames} from '@shopify/react-utilities/styles';

import UnstyledLink from '../UnstyledLink';
import {TabDescriptor} from './Tablist';
import * as styles from './Tablist.scss';

export interface Props {
  selected: boolean,
  focused: boolean,
  siblingTabHasFocus: boolean,
  tab: TabDescriptor,
  panelID?: string,
  children?: React.ReactNode,
  to?: string,
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
      tab,
      focused,
      siblingTabHasFocus,
      children,
      onClick,
      selected,
      to,
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

    const markup = to
      ? (
      <UnstyledLink
        to={to}
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
