import React, {useRef} from 'react';

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
import {portal} from '../shared';
import {useIsAfterInitialMount} from '../../utilities/use-is-after-initial-mount';

export interface TrapFocusProps {
  trapping?: boolean;
  children?: React.ReactNode;
}

export function TrapFocus({trapping = true, children}: TrapFocusProps) {
  const {canSafelyFocus} = useFocusManager({trapping});
  const focusTrapWrapper = useRef<HTMLDivElement>(null);
  const isMounted = useIsAfterInitialMount();

  const disableFocus =
    isMounted &&
    canSafelyFocus &&
    !(
      focusTrapWrapper.current &&
      focusTrapWrapper.current.contains(document.activeElement)
    )
      ? !trapping
      : true;

  const handleFocusIn = (event: FocusEvent) => {
    const containerContentsHaveFocus =
      focusTrapWrapper.current &&
      focusTrapWrapper.current.contains(document.activeElement);

    if (
      trapping === false ||
      !focusTrapWrapper.current ||
      containerContentsHaveFocus ||
      (event.target instanceof Element &&
        event.target.matches(`${portal.selector} *`))
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
    <Focus disabled={disableFocus} root={focusTrapWrapper.current}>
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
