import * as React from 'react';

import {MenuGroupDescriptor} from '../../../../types';

import ActionList from '../../../ActionList';
import Popover from '../../../Popover';
import MenuAction from '../MenuAction';

import styles from './MenuGroup.scss';

export interface Props extends MenuGroupDescriptor {
  active?: boolean;
  onOpen(title: string): void;
  onClose(title: string): void;
}

export default class MenuGroup extends React.Component<Props, never> {
  render() {
    const {actions, details, title, icon, active} = this.props;

    const popoverActivator = (
      <MenuAction
        content={title}
        icon={icon}
        disclosure
        onAction={this.handleOpen}
      />
    );

    return (
      <Popover
        active={Boolean(active)}
        activator={popoverActivator}
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
