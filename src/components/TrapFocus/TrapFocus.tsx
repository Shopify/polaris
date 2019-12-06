import React, {useState, useRef} from 'react';
import {closest} from '@shopify/javascript-utilities/dom';
import {
  focusFirstFocusableNode,
  findFirstFocusableNode,
  focusLastFocusableNode,
} from '@shopify/javascript-utilities/focus';
import {write} from '@shopify/javascript-utilities/fastdom';

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

  const handleBlur = (event: FocusEvent) => {
    const {relatedTarget} = event;

    if (trapping === false) {
      return;
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
      write(() => focusFirstFocusableNode(firstNode, true));
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
