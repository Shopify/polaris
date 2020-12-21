import React, {useState, useRef, useEffect} from 'react';

import {Key} from '../../types';
import {EventListener} from '../EventListener';
import {KeypressListener} from '../KeypressListener';
import {Focus} from '../Focus';
import {
  focusFirstFocusableNode,
  findFirstKeyboardFocusableNode,
  focusFirstKeyboardFocusableNode,
  findLastKeyboardFocusableNode,
  focusLastKeyboardFocusableNode,
} from '../../utilities/focus';
import {useFocusManager} from '../../utilities/focus-manager';

export interface TrapFocusProps {
  trapping?: boolean;
  children?: React.ReactNode;
}

export function TrapFocus({trapping = true, children}: TrapFocusProps) {
  const [shouldFocusSelf, setFocusSelf] = useState<boolean | undefined>(
    undefined,
  );
  const {canSafelyFocus} = useFocusManager({trapping});
  const focusTrapWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFocusSelf(
      !(
        canSafelyFocus &&
        focusTrapWrapper.current &&
        focusTrapWrapper.current.contains(document.activeElement)
      ),
    );
  }, [canSafelyFocus]);

  const shouldDisableFirstElementFocus = () => {
    if (shouldFocusSelf === undefined || !canSafelyFocus) {
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
      canSafelyFocus &&
      event.target instanceof HTMLElement &&
      focusTrapWrapper.current !== event.target &&
      !focusTrapWrapper.current.contains(event.target)
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
