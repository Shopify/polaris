export function getVisibleAndHiddenActionsIndices(
  actions: any[] = [],
  groups: any[] = [],
  disclosureWidth: number,
  actionsWidths: number[],
  containerWidth: number,
) {
  const sumTabWidths = actionsWidths.reduce((sum, width) => sum + width, 0);
  const arrayOfActionsIndices = actions.map((_, index) => {
    return index;
  });
  const arrayOfGroupsIndices = groups.map((_, index) => {
    return index;
  });

  const visibleActions: number[] = [];
  const hiddenActions: number[] = [];
  const visibleGroups: number[] = [];
  const hiddenGroups: number[] = [];

  if (containerWidth > sumTabWidths) {
    visibleActions.push(...arrayOfActionsIndices);
    visibleGroups.push(...arrayOfGroupsIndices);
  } else {
    let accumulatedWidth = 0;

    arrayOfActionsIndices.forEach((currentActionsIndex) => {
      const currentActionsWidth = actionsWidths[currentActionsIndex];

      if (
        accumulatedWidth + currentActionsWidth >=
        containerWidth - disclosureWidth
      ) {
        hiddenActions.push(currentActionsIndex);
        return;
      }

      visibleActions.push(currentActionsIndex);
      accumulatedWidth += currentActionsWidth;
    });

    arrayOfGroupsIndices.forEach((currentGroupsIndex) => {
      const currentActionsWidth =
        actionsWidths[currentGroupsIndex + actions.length];

      if (
        accumulatedWidth + currentActionsWidth >=
        containerWidth - disclosureWidth
      ) {
        hiddenGroups.push(currentGroupsIndex);
        return;
      }

      visibleGroups.push(currentGroupsIndex);
      accumulatedWidth += currentActionsWidth;
    });
  }

  return {
    visibleActions,
    hiddenActions,
    visibleGroups,
    hiddenGroups,
  };
}
