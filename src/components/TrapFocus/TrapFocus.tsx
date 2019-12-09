import React, {useState, useRef} from 'react';
import {closest} from '@shopify/javascript-utilities/dom';
import {
  focusFirstFocusableNode,
  findFirstFocusableNode,
  focusLastFocusableNode,
  findLastFocusableNode,
} from '@shopify/javascript-utilities/focus';
import {write} from '@shopify/javascript-utilities/fastdom';

import {Key} from '../../types';
import {useComponentDidMount} from '../../utilities/use-component-did-mount';
import {EventListener} from '../EventListener';
import {Focus} from '../Focus';

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

  const shouldDisable = () => {
    if (shouldFocusSelf === undefined) {
      return true;
    }

    return shouldFocusSelf ? !trapping : !shouldFocusSelf;
  };

  const handleKeyDownLastElement = (event: any) => {
    if (event.keyCode === Key.Tab && focusTrapWrapper.current) {
      !event.shiftKey && focusFirstFocusableNode(focusTrapWrapper.current);

      document.removeEventListener('keydown', handleKeyDownLastElement);
    }
  };

  const handleKeyDownFirstElement = (event: any) => {
    if (event.keyCode === Key.Tab && focusTrapWrapper.current) {
      event.shiftKey && focusLastFocusableNode(focusTrapWrapper.current);

      document.removeEventListener('keydown', handleKeyDownFirstElement);
    }
  };

  const handleBlur = (event: FocusEvent) => {
    const {relatedTarget} = event;

    if (trapping === false) {
      return;
    }

    const firstElement = findFirstFocusableNode(
      findFirstFocusableNode(
        focusTrapWrapper.current as HTMLElement,
      ) as HTMLElement,
    );

    if (
      focusTrapWrapper.current &&
      relatedTarget === findLastFocusableNode(focusTrapWrapper.current)
    ) {
      document.addEventListener('keydown', handleKeyDownLastElement);
    }

    if (focusTrapWrapper.current && relatedTarget === firstElement) {
      document.addEventListener('keydown', handleKeyDownFirstElement);
    }

    if (
      focusTrapWrapper &&
      focusTrapWrapper.current &&
      !focusTrapWrapper.current.contains(relatedTarget as HTMLElement) &&
      (!relatedTarget ||
        !closest(relatedTarget as HTMLElement, '[data-polaris-overlay]'))
    ) {
      event.preventDefault();

      if (
        event.srcElement === findFirstFocusableNode(focusTrapWrapper.current)
      ) {
        return write(() =>
          focusLastFocusableNode(focusTrapWrapper.current as HTMLDivElement),
        );
      }
      const firstNode = findFirstFocusableNode(
        focusTrapWrapper.current,
      ) as HTMLElement;
      write(() => focusFirstFocusableNode(firstNode));
    }
  };

  return (
    <Focus disabled={shouldDisable()} root={focusTrapWrapper.current}>
      <div ref={focusTrapWrapper}>
        <EventListener event="focusout" handler={handleBlur} />
        {children}
      </div>
    </Focus>
  );
}
