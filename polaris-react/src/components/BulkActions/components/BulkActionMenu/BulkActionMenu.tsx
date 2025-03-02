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
  animationDelayIndex?: number;
}

export function BulkActionMenu({
  title,
  actions,
  isNewBadgeInBadgeActions,
  size,
  animationDelayIndex,
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
            animationDelayIndex={animationDelayIndex}
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
