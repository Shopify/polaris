import {
  DisableableAction,
  IconableAction,
  AppBridgeActionTarget,
} from '../../types';

// TODO: Can this instead use `LinkAction`?
// `Header.test.tsx` is using that type and it is working just fine.
export interface RollupSecondaryAction
  extends IconableAction,
    DisableableAction,
    AppBridgeActionTarget {}
