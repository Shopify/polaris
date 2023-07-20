import React from 'react';

import {ActionList} from '../../../ActionList';
import type {ActionListProps} from '../../../ActionList';
import type {ActionListSection} from '../../../../types';
import {Popover} from '../../../Popover';
import {Box} from '../../../Box';
import {classNames} from '../../../../utilities/css';
import {useFeatures} from '../../../../utilities/features';

import {MenuItem, Message} from './components';
import type {MessageProps} from './components';
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
  /** A string that provides the accessibility labeling */
  accessibilityLabel?: string;
  /** A custom width value that can be used to set the width of the menu */
  customWidth?: string;
  /** A boolean property indicating whether the menu is being used as a user menu */
  userMenu?: boolean;
  /** Whether to indent the menu items, or not */
  indent?: boolean;
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
    indent,
  } = props;
  const {polarisSummerEditions2023} = useFeatures();

  const badgeProps = message &&
    message.badge && {
      content: message.badge.content,
      status: message.badge.status,
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

  let storeListSection: ActionListSection | undefined = undefined;
  let remainingSections: ActionListSection[] = [];

  if (actions) {
    [storeListSection, ...remainingSections] = actions;
  }

  console.log('actions', actions);
  console.log('storeListSection', storeListSection);

  let otherStoresMarkup: React.ReactNode | null = null;

  const storeListSectionItemMarkup = storeListSection?.items.map(
    (
      {
        content,
        id,
        accessibilityLabel,
        url,
        onAction,
        icon,
        prefix,
        suffix,
        external,
        truncate,
        role,
      },
      index,
    ) => {
      const itemMarkup = (
        <MenuItem
          key={`${content}-${index}`}
          content={content}
          onAction={onAction}
          id={id}
          accessibilityLabel={accessibilityLabel}
          url={url}
          icon={icon}
          prefix={prefix}
          suffix={suffix}
          external={external}
          truncate={truncate}
          role={role}
        />
      );

      if (id === 'otherStores') {
        otherStoresMarkup = itemMarkup;
        return null;
      }

      return itemMarkup;
    },
  );

  const indentedSectionMarkup = (
    <div className={styles.StoreListSection}>
      {storeListSection && storeListSectionItemMarkup}
    </div>
  );

  return (
    <Popover
      activator={
        <div className={styles.ActivatorWrapper}>
          <button
            type="button"
            className={classNames(
              styles.Activator,
              userMenu &&
                polarisSummerEditions2023 &&
                styles['Activator-userMenu'],
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
        {indent ? (
          <div className={styles.TopSection}>
            {indentedSectionMarkup}
            {otherStoresMarkup}
          </div>
        ) : null}

        <Box width={customWidth}>
          <ActionList
            actionRole="menuitem"
            onActionAnyItem={onClose}
            sections={indent ? remainingSections : actions}
          />
          {messageMarkup}
        </Box>
      </div>
    </Popover>
  );
}
