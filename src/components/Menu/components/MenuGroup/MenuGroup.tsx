import * as React from 'react';

import {MenuGroupDescriptor} from '../../../../types';

import ActionList from '../../../ActionList';
import Popover from '../../../Popover';
import MenuAction from '../MenuAction';

import styles from './MenuGroup.scss';

export interface Props extends MenuGroupDescriptor {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Show or hide the MenuGroup */
  active?: boolean;
  /** Callback for opening the MenuGroup by title */
  onOpen(title: string): void;
  /** Callback for closing the MenuGroup by title */
  onClose(title: string): void;
}

export default class MenuGroup extends React.Component<Props, never> {
  render() {
    const {
      accessibilityLabel,
      active,
      actions,
      details,
      title,
      icon,
    } = this.props;

    const popoverActivator = (
      <MenuAction
        content={title}
        icon={icon}
        accessibilityLabel={accessibilityLabel}
        disclosure
        onAction={this.handleOpen}
      />
    );

    return (
      <Popover
        active={Boolean(active)}
        activator={popoverActivator}
        preferredAlignment="left"
        onClose={this.handleClose}
      >
        <ActionList items={actions} onActionAnyItem={this.handleClose} />

        {details && <div className={styles.Details}>{details}</div>}
      </Popover>
    );
  }

  private handleClose = () => {
    const {title, onClose} = this.props;
    onClose(title);
  };

  private handleOpen = () => {
    const {title, onOpen} = this.props;
    onOpen(title);
  };
}
