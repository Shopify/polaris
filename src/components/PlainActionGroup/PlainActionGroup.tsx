import * as React from 'react';

import ActionList from '../ActionList';
import Popover from '../Popover';
import PlainAction from '../PlainAction';

import {PlainActionGroupDescriptor} from './types';
import styles from './PlainActionGroup.scss';

export interface Props extends PlainActionGroupDescriptor {
  active?: boolean;
  onOpen(title: string): void;
  onClose(title: string): void;
}

export default class PlainActionGroup extends React.Component<Props, never> {
  render() {
    const {actions, details, title, icon, active = false} = this.props;

    const popoverActivator = (
      <PlainAction
        content={title}
        icon={icon}
        disclosure
        onAction={this.handleOpen}
      />
    );

    const detailsMarkup = details && (
      <div className={styles.Details}>{details}</div>
    );

    return (
      <div
        key={`PlainActionGroup-${title}`}
        className={styles.PlainActionGroup}
      >
        <Popover
          key={title}
          active={active}
          activator={popoverActivator}
          onClose={this.handleClose}
        >
          <ActionList items={actions} onActionAnyItem={this.handleClose} />
          {detailsMarkup}
        </Popover>
      </div>
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
