import type {Experimental} from '../../types';

export type Status =
  | 'info'
  | 'success'
  | 'warning'
  | 'critical'
  | 'attention'
  | 'new'
  | Experimental<
      | 'info-strong'
      | 'success-strong'
      | 'warning-strong'
      | 'critical-strong'
      | 'attention-strong'
      | 'read-only'
      | 'enabled'
    >;

export enum StatusValue {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Critical = 'critical',
  Attention = 'attention',
  New = 'new',
  InfoStrongExperimental = 'info-strong-experimental',
  SuccessStrongExperimental = 'success-strong-experimental',
  WarningStrongExperimental = 'warning-strong-experimental',
  CriticalStrongExperimental = 'critical-strong-experimental',
  AttentionStrongExperimental = 'attention-strong-experimental',
  ReadOnlyExperimental = 'read-only-experimental',
  EnabledExperimental = 'enabled-experimental',
}

export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

export enum ProgressValue {
  Incomplete = 'incomplete',
  PartiallyComplete = 'partiallyComplete',
  Complete = 'complete',
}

export type Size = 'small' | 'medium' | Experimental<'large'>;
