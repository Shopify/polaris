import React from 'react';

import {classNames} from '../../../../../../utilities/css';
import {Button} from '../../../../../Button';
import {Heading} from '../../../../../Heading';
import {TextContainer} from '../../../../../TextContainer';
import {
  NotificationList,
  NotificationListProps,
} from '../../../../../NotificationList';
import {Popover, PopoverProps} from '../../../../../Popover';

// eslint-disable-next-line @shopify/strict-component-boundaries
import type {MessageProps} from './components/Message';
import styles from './Menu.scss';

export interface MenuProps {
  /** Accepts an activator component that renders inside of a button that opens the menu */
  activatorContent: React.ReactNode;
  /** An array of action objects that are rendered inside of a popover triggered by this menu */
  notifications?: NotificationListProps['sections'];
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
    notifications,
    onOpen,
    onClose,
    open,
    activatorContent,
    message,
    colorScheme,
    accessibilityLabel,
  } = props;

  const isFullHeight = Boolean(message) || Boolean(notifications);

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
      <Popover.Section>
        <TextContainer>
          <Heading>{message && message.title}</Heading>
        </TextContainer>
      </Popover.Section>
      <div className={classNames(styles.Section, styles.SectionWithoutTitle)}>
        <NotificationList onActionAnyItem={onClose} sections={notifications} />
      </div>
      <div className={classNames(styles.Section, styles.SectionRight)}>
        <Popover.Section>
          <Button plain onClick={message && message.action.onClick}>
            {message && message.action.content}
          </Button>
        </Popover.Section>
      </div>
    </Popover>
  );
}
