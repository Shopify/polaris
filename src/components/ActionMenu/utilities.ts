import {MenuActionDescriptor, MenuGroupDescriptor} from '../../types';

export function sortAndOverrideActionOrder(
  actions: (MenuActionDescriptor | MenuGroupDescriptor)[],
) {
  const actionsWithOverrides = actions.filter(
    (action) => action.index !== undefined,
  );

  if (actionsWithOverrides.length === 0) {
    return actions;
  }

  const sortedActionsWithOverrides = actionsWithOverrides.sort(
    ({index: indexA = 0}, {index: indexB = 0}) => {
      return indexA - indexB;
    },
  );

  const actionsWithoutOverrides = actions.filter(
    (action) => action.index === undefined,
  );

  const overriddenActions: (MenuActionDescriptor | MenuGroupDescriptor)[] = [
    ...actionsWithoutOverrides,
  ];

  sortedActionsWithOverrides.forEach((action) => {
    if (action.index !== undefined) {
      overriddenActions.splice(action.index, 0, action);
    }
  });

  return overriddenActions;
}
