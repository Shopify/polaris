import React from 'react';

import {ActionList} from '../../../ActionList';
import type {ActionListProps} from '../../../ActionList';
import {Popover} from '../../../Popover';
import {Box} from '../../../Box';
import {classNames} from '../../../../utilities/css';

import {Message} from './components';
import type {MessageProps} from './components';
import styles from './Menu.module.scss';

export interface MenuProps {
  /** Accepts an activator component that renders inside of a button that opens the menu */
  activatorContent: React.ReactNode;
  /** An array of action objects that are rendered inside of a popover triggered by this menu */
  actions: ActionListProps['sections'];
  /** Accepts a message that facilitates direct, urgent communication with the merchant through the menu */
  message?: MessageProps;
  /** A boolean property indicating whether the menu is currently open */
  open: boolean;
  /** A callback function to handle opening the menu popover */
  onOpen(): void;
  /** A callback function to handle closing the menu popover */
  onClose(): void;
  /** A callback function to handle closing the menu popover */
  onClose(): void;
  /** A string that provides the accessibility labeling */
  accessibilityLabel?: string;
  /** A custom width value that can be used to set the width of the menu */
  customWidth?: string;
  /** A boolean property indicating whether the menu is being used as a user menu */
  userMenu?: boolean;
}

export function Menu(props: MenuProps) {
  const {
    actions,
    onOpen,
    onClose,
    open,
    activatorContent,
    message,
    accessibilityLabel,
    customWidth,
    userMenu,
  } = props;

  const badgeProps = message &&
    message.badge && {
      content: message.badge.content,
      tone: message.badge.tone,
    };

  const messageMarkup = message && (
    <Message
      title={message.title}
      description={message.description}
      action={{
        onClick: message.action.onClick,
        content: message.action.content,
      }}
      link={{to: message.link.to, content: message.link.content}}
      badge={badgeProps}
    />
  );

  return (
    <Popover
      activator={
        <div className={styles.ActivatorWrapper}>
          <button
            type="button"
            className={classNames(
              styles.Activator,
              userMenu && styles['Activator-userMenu'],
            )}
            onClick={onOpen}
            aria-label={accessibilityLabel}
          >
            {activatorContent}
          </button>
        </div>
      }
      active={open}
      onClose={onClose}
      fixed
      fullHeight
      preferredAlignment="right"
    >
      <div className={styles.MenuItems}>
        <Box width={customWidth}>
          <ActionList
            actionRole="menuitem"
            onActionAnyItem={onClose}
            sections={actions}
          />
          {messageMarkup}
        </Box>
      </div>
    </Popover>
  );
}
