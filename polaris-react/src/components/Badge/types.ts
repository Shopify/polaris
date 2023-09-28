import type {Experimental} from '../../types';

export type Status =
  | 'info'
  | 'success'
  | 'warning'
  | 'critical'
  | 'attention'
  | 'new'
  | Experimental<
      | 'success-subdued'
      | 'warning-subdued'
      | 'critical-subdued'
      | 'info-strong'
      | 'success-strong'
      | 'warning-strong'
      | 'critical-strong'
      | 'attention-strong'
      | 'read-only'
    >;

export enum StatusValue {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Critical = 'critical',
  Attention = 'attention',
  New = 'new',
  SuccessSubduedExperimental = 'success-subdued-experimental',
  WarningSubduedExperimental = 'warning-subdued-experimental',
  CriticalSubduedExperimental = 'critical-subdued-experimental',
  InfoStrongExperimental = 'info-strong-experimental',
  SuccessStrongExperimental = 'success-strong-experimental',
  WarningStrongExperimental = 'warning-strong-experimental',
  CriticalStrongExperimental = 'critical-strong-experimental',
  AttentionStrongExperimental = 'attention-strong-experimental',
  ReadOnlyExperimental = 'read-only-experimental',
}

export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

export enum ProgressValue {
  Incomplete = 'incomplete',
  PartiallyComplete = 'partiallyComplete',
  Complete = 'complete',
}

export type Size = 'small' | 'medium' | Experimental<'large'>;
