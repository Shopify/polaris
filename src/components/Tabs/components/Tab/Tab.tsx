import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {autobind} from '@shopify/javascript-utilities/decorators';

import UnstyledLink from '../../../UnstyledLink';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import {handleMouseUpByBlurring} from '../../../../utilities/focus';

import * as styles from '../../Tabs.scss';

export interface Props {
  id: string;
  focused?: boolean;
  siblingTabHasFocus?: boolean;
  selected?: boolean;
  panelID?: string;
  children?: React.ReactNode;
  url?: string;
  measuring?: boolean;
  accessibilityLabel?: string;
  onClick?(id: string): void;
}

export type CombinedProps = Props & WithAppProviderProps;

export class Tab extends React.PureComponent<CombinedProps, never> {
  private node: HTMLElement | null = null;

  // A tab can start selected when it is moved from the disclosure dropdown
  // into the main list, so we need to send focus from the tab to the panel
  // on mount and update
  componentDidMount() {
    const {id, measuring, selected, panelID, focused} = this.props;

    if (measuring) {
      return;
    }

    // Because of timing issues with the render, we may still have the old,
    // in-disclosure version of the tab that has focus. Check for this
    // as a second indicator of focus
    const itemHadFocus =
      focused || (document.activeElement && document.activeElement.id === id);

    // If we just check for selected, the panel for the active tab will
    // be focused on page load, which we don’t want
    if (itemHadFocus && selected && panelID != null) {
      focusPanelID(panelID);
    }
  }

  componentDidUpdate(previousProps: Props) {
    const {selected: wasSelected} = previousProps;
    const {focused, measuring, selected, panelID} = this.props;

    if (measuring) {
      return;
    }

    if (selected && !wasSelected && panelID != null) {
      focusPanelID(panelID);
    } else if (focused && this.node != null) {
      focusFirstFocusableNode(this.node);
    }
  }

  render() {
    const {
      id,
      focused,
      siblingTabHasFocus,
      children,
      onClick,
      selected,
      url,
      panelID,
      measuring,
      accessibilityLabel,
    } = this.props;

    const handleClick = onClick && onClick.bind(null, id);

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

    const markup = url ? (
      <UnstyledLink
        id={id}
        url={url}
        role="tab"
        tabIndex={tabIndex}
        onClick={handleClick}
        className={className}
        aria-selected={selected}
        aria-controls={panelID}
        aria-label={accessibilityLabel}
        onMouseUp={handleMouseUpByBlurring}
      >
        <span className={styles.Title}>{children}</span>
      </UnstyledLink>
    ) : (
      <button
        id={id}
        role="tab"
        type="button"
        tabIndex={tabIndex}
        className={className}
        onClick={handleClick}
        aria-selected={selected}
        aria-controls={panelID}
        aria-label={accessibilityLabel}
        onMouseUp={handleMouseUpByBlurring}
      >
        <span className={styles.Title}>{children}</span>
      </button>
    );

    return (
      <li
        role="presentation"
        className={styles.TabContainer}
        ref={this.setNode}
      >
        {markup}
      </li>
    );
  }

  @autobind
  private setNode(node: HTMLElement | null) {
    this.node = node;
  }
}

function focusPanelID(panelID: string) {
  const panel = document.getElementById(panelID);
  if (panel) {
    panel.focus();
  }
}

export default withAppProvider<Props>()(Tab);
