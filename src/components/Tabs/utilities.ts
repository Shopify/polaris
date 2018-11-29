import {TabDescriptor} from './types';

export function getVisibleAndHiddenTabIndices(
  tabs: TabDescriptor[],
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
    let newTabWidth: number = tabWidths[selected];

    arrayOfTabIndices.forEach((index) => {
      if (index !== selected) {
        if (newTabWidth + tabWidths[index] > containerWidth - disclosureWidth) {
          hiddenTabs.push(index);
          return;
        }
        visibleTabs.push(index);
        newTabWidth += tabWidths[index];
      }
    });
  }

  return {
    visibleTabs,
    hiddenTabs,
  };
}
