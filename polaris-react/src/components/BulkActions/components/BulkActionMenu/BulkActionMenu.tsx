import React from 'react';

import {Popover} from '../../../Popover';
import {ActionList} from '../../../ActionList';
import {BulkActionButton} from '../BulkActionButton';
import {useToggle} from '../../../../utilities/use-toggle';
import type {MenuGroupDescriptor} from '../../../../types';
import type {ButtonProps} from '../../../Button';

export interface BulkActionsMenuProps extends MenuGroupDescriptor {
  isNewBadgeInBadgeActions: boolean;
  size?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
}

export function BulkActionMenu({
  title,
  actions,
  isNewBadgeInBadgeActions,
  size,
}: BulkActionsMenuProps) {
  const {value: isVisible, toggle: toggleMenuVisibility} = useToggle(false);

  return (
    <>
      <Popover
        active={isVisible}
        activator={
          <BulkActionButton
            disclosure
            showContentInButton
            onAction={toggleMenuVisibility}
            content={title}
            indicator={isNewBadgeInBadgeActions}
            size={size}
          />
        }
        onClose={toggleMenuVisibility}
        preferInputActivator
      >
        <ActionList items={actions} onActionAnyItem={toggleMenuVisibility} />
      </Popover>
    </>
  );
}
