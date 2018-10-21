import {ActionGroupDescriptor} from './components';

export function hasNewStatus(actions: ActionGroupDescriptor['actions']) {
  for (let i = 0; i < actions.length; i++) {
    const {badge} = actions[i];
    if (badge && badge.status === 'new') {
      return true;
    }
  }
  return false;
}
