import type {TabProps} from './types';

export function getVisibleAndHiddenTabIndices(
  tabs: Omit<TabProps, 'onToggleModal' | 'onTogglePopover'>[],
  selected: number,
  disclosureWidth: number,
  tabWidths: number[],
  containerWidth: number,
) {
  const sumTabWidths = tabWidths.reduce((sum, width) => sum + width, 0);
  const arrayOfTabIndices = tabs.map((_, index) => {
    return index;
  });

  const visibleTabs: number[] = [];
  const hiddenTabs: number[] = [];

  if (containerWidth > sumTabWidths) {
    visibleTabs.push(...arrayOfTabIndices);
  } else {
    visibleTabs.push(selected);

    let tabListWidth = tabWidths[selected];

    arrayOfTabIndices.forEach((currentTabIndex) => {
      if (currentTabIndex !== selected) {
        const currentTabWidth = tabWidths[currentTabIndex];

        if (
          tabListWidth + currentTabWidth >=
          containerWidth - disclosureWidth
        ) {
          hiddenTabs.push(currentTabIndex);
          return;
        }

        visibleTabs.push(currentTabIndex);
        tabListWidth += currentTabWidth;
      }
    });
  }

  return {
    visibleTabs,
    hiddenTabs,
  };
}
