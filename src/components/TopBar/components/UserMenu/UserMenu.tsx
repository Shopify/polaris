import * as React from 'react';
import {IconableAction} from '../../../../types';

import {Avatar, AvatarProps} from '../../../../components';
import {Props as MessageProps} from '../Menu/components/Message';
import {Menu} from '../../components';
import MessageIndicator from '../../../MessageIndicator';

import styles from './UserMenu.scss';

export interface Props {
  actions: {items: IconableAction[]}[];
  message?: MessageProps;
  name: string;
  detail: string;
  initials: AvatarProps['initials'];
  avatar?: AvatarProps['source'];
  open: boolean;
  onToggle(): void;
}

export default function UserMenu({
  name,
  detail,
  avatar,
  initials,
  actions,
  message,
  onToggle,
  open,
}: Props) {
  const showIndicator = Boolean(message);

  const activatorContentMarkup = (
    <div className={styles.UserMenu}>
      <MessageIndicator active={showIndicator}>
        <Avatar
          size="small"
          source={avatar}
          initials={initials && initials.replace(' ', '')}
        />
      </MessageIndicator>
      <span className={styles.Details}>
        <p className={styles.Name} title="altText">
          {name}
        </p>
        <p className={styles.Detail}>{detail}</p>
      </span>
    </div>
  );

  return (
    <Menu
      activatorContent={activatorContentMarkup}
      open={open}
      onOpen={onToggle}
      onClose={onToggle}
      actions={actions}
      message={message}
    />
  );
}
