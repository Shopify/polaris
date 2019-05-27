import React from 'react';

import styles from '../../Tabs.scss';
import UnstyledLink from '../../../UnstyledLink';

export interface Props {
  id: string;
  panelID?: string;
  children?: React.ReactNode;
  url?: string;
  accessibilityLabel?: string;
  onClick?(): void;
}

export default class Item extends React.PureComponent<Props, never> {
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

    return <li>{markup}</li>;
  }
}

function noop() {}
