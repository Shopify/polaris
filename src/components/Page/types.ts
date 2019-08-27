import {
  DestructableAction,
  DisableableAction,
  LoadableAction,
} from '../../types';

export interface HeaderPrimaryAction
  extends DestructableAction,
    DisableableAction,
    LoadableAction {
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
}
