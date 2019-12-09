import React, {memo, useEffect} from 'react';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';

export interface FocusProps {
  children?: React.ReactNode;
  disabled?: boolean;
  root: HTMLElement | null;
}

export const Focus = memo(function Focus({
  children,
  disabled,
  root,
}: FocusProps) {
  useEffect(() => {
    if (disabled) return;

    if (root) {
      if (!root.querySelector('[autofocus]')) {
        focusFirstFocusableNode(root, false);
      }
    }
  }, [disabled, root]);

  return <React.Fragment>{children}</React.Fragment>;
});
