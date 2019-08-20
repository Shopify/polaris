import {MenuActionDescriptor, MenuGroupDescriptor} from '../../types';

export function sortAndOverrideActionOrder(
  actions: (MenuActionDescriptor | MenuGroupDescriptor)[],
) {
  const sortedActionsWithOverrides = actions
    .filter((action) => action.index !== undefined)
    .sort(({index: indexA = 0}, {index: indexB = 0}) => {
      return indexA - indexB;
    });

  const overriddenActions: (
    | MenuActionDescriptor
    | MenuGroupDescriptor)[] = actions.filter(
    (action) => action.index === undefined,
  );

  sortedActionsWithOverrides.forEach((action) => {
    action.index && overriddenActions.splice(action.index, 0, action);
  });

  return overriddenActions;
}
