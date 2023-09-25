export type Tone =
  | 'info'
  | 'success'
  | 'warning'
  | 'critical'
  | 'attention'
  | 'new'
  | 'info-strong-experimental'
  | 'success-strong-experimental'
  | 'warning-strong-experimental'
  | 'critical-strong-experimental'
  | 'attention-strong-experimental'
  | 'read-only-experimental'
  | 'enabled-experimental';

export enum ToneValue {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Critical = 'critical',
  Attention = 'attention',
  New = 'new',
  InfoStrong = 'info-strong-experimental',
  SuccessStrong = 'success-strong-experimental',
  WarningStrong = 'warning-strong-experimental',
  CriticalStrong = 'critical-strong-experimental',
  AttentionStrong = 'attention-strong-experimental',
  ReadOnly = 'read-only-experimental',
  Enabled = 'enabled-experimental',
}

export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

export enum ProgressValue {
  Incomplete = 'incomplete',
  PartiallyComplete = 'partiallyComplete',
  Complete = 'complete',
}

export type Size = 'small' | 'medium' | 'large';
