import type {CheckboxHandles} from '../../types';

export type ResourceListSelectedItems = string[] | 'All';
export type CheckableButtonKey = 'plain' | 'selectAll';
export type CheckableButtons = Map<CheckableButtonKey, CheckboxHandles>;

export const SELECT_ALL_ITEMS = 'All';
