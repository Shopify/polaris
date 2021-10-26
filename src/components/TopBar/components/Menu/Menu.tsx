import React from 'react';

import {ActionList, ActionListProps} from '../../../ActionList';
import {Popover, PopoverProps} from '../../../Popover';

import {Message, MessageProps} from './components';
import styles from './Menu.scss';

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
  /** Accepts a color scheme for the contents of the menu */
  colorScheme?: PopoverProps['colorScheme'];
  /** A string that provides the accessibility labeling */
  accessibilityLabel?: string;
}

export function Menu(props: MenuProps) {
  const {
    actions,
    onOpen,
    onClose,
    open,
    activatorContent,
    message,
    colorScheme,
    accessibilityLabel,
  } = props;

  const badgeProps = message &&
    message.badge && {
      content: message.badge.content,
      status: message.badge.status,
    };
  const linkProps = message &&
    message.link && {to: message.link.to, content: message.link.content};
  const messageMarkup = message && (
    <Message
      title={message.title}
      description={message.description}
      action={{
        onClick: message.action.onClick,
        content: message.action.content,
      }}
      link={linkProps}
      badge={badgeProps}
    />
  );

  const isFullHeight = Boolean(message);

  return (
    <Popover
      activator={
        <div className={styles.ActivatorWrapper}>
          <button
            type="button"
            className={styles.Activator}
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
      fullHeight={isFullHeight}
      preferredAlignment="right"
      colorScheme={colorScheme}
    >
      <ActionList onActionAnyItem={onClose} sections={actions} />
      {messageMarkup}
    </Popover>
  );
}
