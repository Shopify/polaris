import type {
  BadgeAction,
  DisableableAction,
  ActionListSection,
  MenuGroupDescriptor,
} from '../../types';

import type {BulkActionsProps} from './BulkActions';

type BulkActionListSection = ActionListSection;

export function getVisibleAndHiddenActionsIndices(
  promotedActions: any[] = [],
  actions: any[] = [],
  disclosureWidth: number,
  actionsWidths: number[],
  containerWidth: number,
) {
  const sumTabWidths = actionsWidths.reduce((sum, width) => sum + width, 0);
  const arrayOfPromotedActionsIndices = promotedActions.map((_, index) => {
    return index;
  });
  const arrayOfActionsIndices = actions.map((_, index) => {
    return index;
  });

  const visiblePromotedActions: number[] = [];
  const hiddenPromotedActions: number[] = [];
  const visibleActions: number[] = [];
  const hiddenActions: number[] = [];

  if (containerWidth > sumTabWidths) {
    visiblePromotedActions.push(...arrayOfPromotedActionsIndices);
    visibleActions.push(...arrayOfActionsIndices);
  } else {
    let accumulatedWidth = 0;

    arrayOfPromotedActionsIndices.forEach((currentPromotedActionsIndex) => {
      const currentActionsWidth = actionsWidths[currentPromotedActionsIndex];

      if (
        accumulatedWidth + currentActionsWidth >=
        containerWidth - disclosureWidth
      ) {
        hiddenPromotedActions.push(currentPromotedActionsIndex);
        return;
      }

      visiblePromotedActions.push(currentPromotedActionsIndex);
      accumulatedWidth += currentActionsWidth;
    });

    arrayOfActionsIndices.forEach((currentActionsIndex) => {
      const currentActionsWidth =
        actionsWidths[currentActionsIndex + promotedActions.length];

      const action = actions[currentActionsIndex];
      const isActionSection = instanceOfBulkActionListSection(action);
      const actionWillNotFit =
        accumulatedWidth + currentActionsWidth >=
        containerWidth - disclosureWidth;

      if (actionWillNotFit || isActionSection) {
        hiddenActions.push(currentActionsIndex);
        return;
      }

      visibleActions.push(currentActionsIndex);
      accumulatedWidth += currentActionsWidth;
    });
  }

  return {
    visiblePromotedActions,
    hiddenPromotedActions,
    visibleActions,
    hiddenActions,
  };
}

export function instanceOfBulkActionListSectionArray(
  actions: (BulkAction | BulkActionListSection)[],
): actions is BulkActionListSection[] {
  const validList = actions.filter((action: any) => {
    return action.items;
  });

  return actions.length === validList.length;
}

export function instanceOfBulkActionArray(
  actions: (BulkAction | BulkActionListSection)[],
): actions is BulkAction[] {
  const validList = actions.filter((action: any) => {
    return !action.items;
  });

  return actions.length === validList.length;
}

export type BulkAction = DisableableAction & BadgeAction;

export function instanceOfMenuGroupDescriptor(
  action: MenuGroupDescriptor | BulkAction,
): action is MenuGroupDescriptor {
  return 'title' in action && 'actions' in action;
}

export function instanceOfBulkActionListSection(
  action: BulkAction | BulkActionListSection,
): action is BulkActionListSection {
  return 'items' in action;
}

export function getActionSections(
  actions: BulkActionsProps['actions'],
): BulkActionListSection[] | undefined {
  if (!actions || actions.length === 0) {
    return;
  }

  if (instanceOfBulkActionListSectionArray(actions)) {
    return actions;
  }

  if (instanceOfBulkActionArray(actions)) {
    return [
      {
        items: actions,
      },
    ];
  }
}

export function isNewBadgeInBadgeActions(
  actionSections?: BulkActionListSection[],
) {
  if (!actionSections) return false;

  for (const action of actionSections) {
    for (const item of action.items) {
      if (item.badge?.tone === 'new') return true;
    }
  }

  return false;
}

export function flattenActions(
  actions: BulkActionsProps['actions'],
): BulkAction[] {
  if (!actions) return [];

  return actions.reduce((memo, section) => {
    if (instanceOfBulkActionListSection(section)) {
      return [...memo, ...section.items];
    }
    return [...memo, section];
  }, []);
}

export function getUnflattenedHiddenActions(
  actions: BulkActionsProps['actions'],
  hiddenActions: number[],
): BulkActionsProps['actions'] {
  let currentIndex = 0;

  const unflattenedHiddenActions = actions?.reduce((memo, action) => {
    const isSection = instanceOfBulkActionListSection(action);

    if (!isSection) {
      const isAHiddenAction = hiddenActions.includes(currentIndex);
      currentIndex++;
      return isAHiddenAction ? [...memo, action] : memo;
    }
    const filteredActionItems = action.items.filter((_) => {
      const isAHiddenAction = hiddenActions.includes(currentIndex);
      currentIndex++;
      return isAHiddenAction;
    });
    if (filteredActionItems.length) {
      return [...memo, {...action, items: filteredActionItems}];
    }
    return memo;
  }, []);

  return unflattenedHiddenActions;
}
