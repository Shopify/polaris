import type {SpaceScale} from '@shopify/polaris-tokens';
import {useEffect, useRef, useState} from 'react';

import styles from '../LegacyCard.scss';

export function useLegacyCardPaddingObserverRef() {
  const legacyCardNode = useRef<HTMLDivElement>(null);
  const [firstSectionElement, setFirstSectionElement] =
    useState<Element | null>(null);
  const [lastSectionElement, setLastSectionElement] = useState<Element | null>(
    null,
  );

  useEffect(() => {
    if (legacyCardNode.current) {
      const updateFirstAndLastSectionPadding = () => {
        // Reset old first and last section padding
        updatePadding(firstSectionElement, '2', 'top');
        updatePadding(lastSectionElement, '2', 'bottom');

        // Get current first and last sections
        const currentElements = legacyCardNode.current?.querySelectorAll(
          `.${styles.Section}, .${styles.Header}, .${styles.Footer}`,
        );

        if (currentElements?.length) {
          const firstSection = currentElements[0];
          const lastSection = currentElements[currentElements.length - 1];

          // Update current element padding
          updatePadding(firstSection, '4', 'top');
          updatePadding(lastSection, '4', 'bottom');

          // Update state with current elements
          setFirstSectionElement(firstSection);
          setLastSectionElement(lastSection);
        }
      };

      // First initial render
      updateFirstAndLastSectionPadding();

      // Re-run when descendants are changed
      const observer = new MutationObserver(updateFirstAndLastSectionPadding);
      observer.observe(legacyCardNode.current, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, [firstSectionElement, lastSectionElement]);

  return legacyCardNode;
}

function updatePadding(
  element: Element | null,
  space: SpaceScale,
  area: 'top' | 'bottom',
) {
  if (!element || element.className.includes('flush')) return;

  switch (area) {
    case 'top':
      (element as HTMLElement).style.paddingTop = `var(--p-space-${space})`;
      return;
    case 'bottom':
      (element as HTMLElement).style.paddingBottom = `var(--p-space-${space})`;
  }
}
