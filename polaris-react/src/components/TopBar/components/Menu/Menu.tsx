import React from 'react';

import {ActionList} from '../../../ActionList';
import type {ActionListProps} from '../../../ActionList';
import type {
  ActionListItemDescriptor,
  UserMenuTopSection,
} from '../../../../types';
import {Popover} from '../../../Popover';
import {Box} from '../../../Box';
import {classNames} from '../../../../utilities/css';
import {useFeatures} from '../../../../utilities/features';
import {Text} from '../../../Text';

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
  /** The top section of the menu */
  topSection?: UserMenuTopSection;
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
    topSection,
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

  const {indentItems, indentedSectionMarkup, otherItemsMarkup} =
    buildSections(topSection);

  const shouldRenderMenuItems =
    polarisSummerEditions2023 && Boolean(indentItems);

  const titleMarkup: string | React.ReactNode = getTitleMarkup(
    shouldRenderMenuItems,
    topSection,
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
        {shouldRenderMenuItems ? (
          <>
            {titleMarkup}
            <div className={styles.TopSection}>
              {indentedSectionMarkup}
              {otherItemsMarkup}
            </div>
          </>
        ) : null}

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

function generateMenuItem(
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
    active,
  }: ActionListItemDescriptor,
  index: number,
) {
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
      active={active}
    />
  );

  return itemMarkup;
}

function buildSections(topSection?: UserMenuTopSection) {
  if (!topSection) {
    return {
      indentItems: undefined,
      indentedSectionMarkup: null,
      otherItemsMarkup: null,
      otherItems: undefined,
    };
  }

  let otherItemsMarkup: React.ReactNode = null;

  const {indentItems, items: otherItems} = topSection;

  const indentedSectionItemMarkup = indentItems?.map((item, index) => {
    const itemMarkup = generateMenuItem(item, index);
    return itemMarkup;
  });

  otherItemsMarkup = otherItems?.map((item, index) => {
    const itemMarkup = generateMenuItem(item, index);
    return (
      <Box
        key={`${item.content}-${index}`}
        width="100%"
        paddingInlineEnd="2"
        insetInlineEnd="2"
      >
        {itemMarkup}
      </Box>
    );
  });

  const indentedSectionMarkup = (
    <div
      className={classNames(
        styles.StoreListSection,
        styles['StoreListSection-indent'],
      )}
    >
      {indentedSectionItemMarkup}
    </div>
  );

  return {
    indentItems,
    indentedSectionMarkup,
    otherItemsMarkup,
  };
}

const getTitleMarkup = (
  hasStoreListSection = false,
  storeListSection?: UserMenuTopSection,
) => {
  if (!hasStoreListSection || !storeListSection?.title) return null;

  if (typeof storeListSection.title === 'string') {
    const variant = 'headingSm';

    return (
      <Box
        paddingBlockStart="3"
        paddingBlockEnd="1"
        paddingInlineStart="3"
        paddingInlineEnd="3"
      >
        <Text as="p" variant={variant}>
          {storeListSection.title}
        </Text>
      </Box>
    );
  }

  return <Box padding="2">{storeListSection.title}</Box>;
};
