import React, {useState, useRef} from 'react';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {Key} from '../../types';

import {useComponentDidMount} from '../../utilities/use-component-did-mount';
import {EventListener} from '../EventListener';
import {KeypressListener} from '../KeypressListener';
import {Focus} from '../Focus';

import {
  findFirstKeyboardFocusableNode,
  focusFirstKeyboardFocusableNode,
  findLastKeyboardFocusableNode,
  focusLastKeyboardFocusableNode,
} from '../../utilities/focus';

export interface TrapFocusProps {
  trapping?: boolean;
  children?: React.ReactNode;
}

export function TrapFocus({trapping = true, children}: TrapFocusProps) {
  const [shouldFocusSelf, setFocusSelf] = useState<boolean | undefined>(
    undefined,
  );

  const focusTrapWrapper = useRef<HTMLDivElement>(null);

  const handleTrappingChange = () => {
    if (
      focusTrapWrapper.current &&
      focusTrapWrapper.current.contains(document.activeElement)
    ) {
      return false;
    }
    return trapping;
  };

  useComponentDidMount(() => setFocusSelf(handleTrappingChange()));

  const shouldDisableFirstElementFocus = () => {
    if (shouldFocusSelf === undefined) {
      return true;
    }

    return shouldFocusSelf ? !trapping : !shouldFocusSelf;
  };

  const handleFocusIn = (event: FocusEvent) => {
    const containerContentsHaveFocus =
      focusTrapWrapper.current &&
      focusTrapWrapper.current.contains(document.activeElement);

    if (
      trapping === false ||
      !focusTrapWrapper.current ||
      containerContentsHaveFocus
    ) {
      return;
    }

    if (
      focusTrapWrapper.current !== event.target &&
      !focusTrapWrapper.current.contains(event.target as Node)
    ) {
      focusFirstFocusableNode(focusTrapWrapper.current);
    }
  };

  const handleTab = (event: KeyboardEvent) => {
    if (trapping === false || !focusTrapWrapper.current) {
      return;
    }

    const firstFocusableNode = findFirstKeyboardFocusableNode(
      focusTrapWrapper.current,
    );
    const lastFocusableNode = findLastKeyboardFocusableNode(
      focusTrapWrapper.current,
    );

    if (event.target === lastFocusableNode && !event.shiftKey) {
      event.preventDefault();
      focusFirstKeyboardFocusableNode(focusTrapWrapper.current);
    }

    if (event.target === firstFocusableNode && event.shiftKey) {
      event.preventDefault();
      focusLastKeyboardFocusableNode(focusTrapWrapper.current);
    }
  };

  return (
    <Focus
      disabled={shouldDisableFirstElementFocus()}
      root={focusTrapWrapper.current}
    >
      <div ref={focusTrapWrapper}>
        <EventListener event="focusin" handler={handleFocusIn} />
        <KeypressListener
          keyCode={Key.Tab}
          keyEvent="keydown"
          handler={handleTab}
        />
        {children}
      </div>
    </Focus>
  );
}
