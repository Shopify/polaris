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
  disclosureWidth: number,
  actionsWidths: number[],
  containerWidth: number,
) {
  const sumTabWidths = actionsWidths.reduce((sum, width) => sum + width, 0);
  const arrayOfPromotedActionsIndices = promotedActions.map((_, index) => {
    return index;
  });

  const visiblePromotedActions: number[] = [];
  const hiddenPromotedActions: number[] = [];

  if (containerWidth > sumTabWidths) {
    visiblePromotedActions.push(...arrayOfPromotedActionsIndices);
  } else {
    let accumulatedWidth = 0;
    let hasReturned = false;

    arrayOfPromotedActionsIndices.forEach((currentPromotedActionsIndex) => {
      const currentActionsWidth = actionsWidths[currentPromotedActionsIndex];
      const notEnoughSpace =
        accumulatedWidth + currentActionsWidth >=
        containerWidth - disclosureWidth;

      if (notEnoughSpace || hasReturned) {
        hiddenPromotedActions.push(currentPromotedActionsIndex);
        hasReturned = true;
        return;
      }

      visiblePromotedActions.push(currentPromotedActionsIndex);
      accumulatedWidth += currentActionsWidth;
    });
  }

  return {
    visiblePromotedActions,
    hiddenPromotedActions,
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
