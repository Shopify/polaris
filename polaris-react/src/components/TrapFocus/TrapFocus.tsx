import type {ReactNode} from 'react';
import {useRef, useEffect, useState} from 'react';

import {Key} from '../../types';
// eslint-disable-next-line import/no-deprecated
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

export interface TrapFocusProps {
  trapping?: boolean;
  children?: ReactNode;
}

export function TrapFocus({trapping = true, children}: TrapFocusProps) {
  const {canSafelyFocus} = useFocusManager({trapping});
  const focusTrapWrapper = useRef<HTMLDivElement>(null);
  const [disableFocus, setDisableFocus] = useState(true);

  useEffect(() => {
    const disable =
      canSafelyFocus &&
      !(
        focusTrapWrapper.current &&
        focusTrapWrapper.current.contains(document.activeElement)
      )
        ? !trapping
        : true;

    setDisableFocus(disable);
  }, [canSafelyFocus, trapping]);

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
