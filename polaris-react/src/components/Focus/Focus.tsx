import type {ReactNode, RefObject} from 'react';
import {memo, useEffect} from 'react';

import {focusFirstFocusableNode} from '../../utilities/focus';

export interface FocusProps {
  children?: ReactNode;
  disabled?: boolean;
  root: RefObject<HTMLElement> | HTMLElement | null;
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

  return <>{children}</>;
});

function isRef(
  ref: RefObject<HTMLElement> | HTMLElement,
): ref is RefObject<HTMLElement> {
  return (ref as RefObject<HTMLElement>).current !== undefined;
}
