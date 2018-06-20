import * as React from 'react';
import {IconableAction} from '../../../../types';

import {Avatar, AvatarProps} from '../../../../components';
import {MessageProps} from '../Menu/components';
import {Menu} from '../../components';
import Indicator from '../Indicator';

import styles from './User.scss';

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

export default function User({
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

  const activator = (
    <div className={styles.User}>
      <Indicator active={showIndicator}>
        <Avatar
          size="small"
          source={avatar}
          initials={initials && initials.replace(' ', '')}
        />
      </Indicator>
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
      activator={activator}
      open={open}
      onOpen={onToggle}
      onClose={onToggle}
      actions={actions}
      message={message}
    />
  );
}
