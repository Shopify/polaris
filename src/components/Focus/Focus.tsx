import React, {memo, useEffect} from 'react';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';

export interface FocusProps {
  children?: React.ReactNode;
  disabled?: boolean;
  root: React.RefObject<HTMLElement> | HTMLElement | null;
}

export const Focus = memo(function Focus({
  children,
  disabled,
  root,
}: FocusProps) {
  useEffect(() => {
    if (disabled || !root) {
      return;
    }

    const node = isRef(root) ? root.current : root;

    if (!node || node.querySelector('[autofocus]')) {
      return;
    }

    focusFirstFocusableNode(node, false);
  }, [disabled, root]);

  return <React.Fragment>{children}</React.Fragment>;
});

function isRef(
  ref: React.RefObject<HTMLElement> | HTMLElement,
): ref is React.RefObject<HTMLElement> {
  return (ref as React.RefObject<HTMLElement>).current !== undefined;
}
