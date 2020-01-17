import {MenuActionDescriptor, MenuGroupDescriptor} from '../../types';

type MenuDescriptorWithIndex = (MenuActionDescriptor | MenuGroupDescriptor) & {
  index: number;
};

export function sortAndOverrideActionOrder(
  actions: (MenuActionDescriptor | MenuGroupDescriptor)[],
) {
  const actionsWithOverrides = actions.filter(
    (action) => action.index !== undefined,
  ) as MenuDescriptorWithIndex[];

  if (actionsWithOverrides.length === 0) {
    return actions;
  }

  const sortedActionsWithOverrides = actionsWithOverrides.sort(
    ({index: indexA}, {index: indexB}) => {
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
    overriddenActions.splice(action.index, 0, action);
  });

  return overriddenActions;
}
