import {PlainActionGroupDescriptor} from '../PlainActionGroup';
import {RollupSecondaryAction} from './types';

export function hasRollupActions(
  secondaryActions?: RollupSecondaryAction[],
  actionGroups?: PlainActionGroupDescriptor[],
) {
  const hasSecondaryActions = secondaryActions && secondaryActions.length >= 1;
  const hasActionGroups = actionGroups && actionGroups.length >= 1;

  return Boolean(hasSecondaryActions || hasActionGroups);
}

export function convertActionGroupToActionListSection({
  title,
  actions,
}: PlainActionGroupDescriptor) {
  return {title, items: actions};
}
