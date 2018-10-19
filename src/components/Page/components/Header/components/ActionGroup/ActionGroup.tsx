import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {Popover, ActionList} from 'components';
import {hasNewStatus} from '../../utilities';
import Action from '../Action';
import {ActionGroupDescriptor} from './types';
import * as styles from './ActionGroup.scss';

export interface Props extends ActionGroupDescriptor {
  active: boolean;
  onOpen(title: string): void;
  onClose(title: string): void;
}

class ActionGroup extends React.Component<Props, never> {
  render() {
    const {actions, details, title, icon, active} = this.props;

    const detailsMarkup = details ? (
      <div className={styles.Details}>{details}</div>
    ) : null;

    const showIndicator = hasNewStatus(actions);

    return (
      <div className={styles.ActionGroup} key={`ActionGroup-${title}`}>
        <Popover
          key={title}
          active={active}
          onClose={this.handleClose}
          activator={
            <Action
              showIndicator={showIndicator}
              hasIndicator={active}
              disclosure
              icon={icon}
              // eslint-disable-next-line react/jsx-no-bind
              onAction={this.handleOpen}
            >
              {title}
            </Action>
          }
        >
          <ActionList
            items={actions}
            // eslint-disable-next-line react/jsx-no-bind
            onActionAnyItem={this.handleClose}
          />
          {detailsMarkup}
        </Popover>
      </div>
    );
  }

  @autobind
  private handleClose() {
    const {title, onClose} = this.props;
    onClose(title);
  }

  @autobind
  private handleOpen() {
    const {title, onOpen} = this.props;
    onOpen(title);
  }
}

export default ActionGroup;
