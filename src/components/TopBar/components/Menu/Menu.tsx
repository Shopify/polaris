import * as React from 'react';
import Message, {Props as MessageProps} from './components/Message';
import {ActionList, ActionListProps, Popover} from '../../../../components';
import styles from './Menu.scss';

export interface Props {
  activatorContent: React.ReactNode;
  actions: ActionListProps['sections'];
  message?: MessageProps;
  open: boolean;
  onOpen(): void;
  onClose(): void;
}

export default function Menu(props: Props) {
  const {actions, onOpen, onClose, open, activatorContent, message} = props;

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

  const isFullHeight = Boolean(message);

  return (
    <Popover
      activator={
        <button type="button" className={styles.Activator} onClick={onOpen}>
          {activatorContent}
        </button>
      }
      active={open}
      onClose={onClose}
      preventAutofocus
      fixed
      fullHeight={isFullHeight}
    >
      <ActionList onActionAnyItem={onClose} sections={actions} />
      {messageMarkup}
    </Popover>
  );
}
