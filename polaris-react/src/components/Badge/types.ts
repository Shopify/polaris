export type Tone =
  | 'info'
  | 'success'
  | 'warning'
  | 'critical'
  | 'attention'
  | 'new'
  | 'magic'
  | 'info-strong'
  | 'success-strong'
  | 'warning-strong'
  | 'critical-strong'
  | 'attention-strong'
  | 'read-only'
  | 'enabled';

export enum ToneValue {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Critical = 'critical',
  Attention = 'attention',
  New = 'new',
  Magic = 'magic',
  InfoStrong = 'info-strong',
  SuccessStrong = 'success-strong',
  WarningStrong = 'warning-strong',
  CriticalStrong = 'critical-strong',
  AttentionStrong = 'attention-strong',
  ReadOnly = 'read-only',
  Enabled = 'enabled',
}

export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

export enum ProgressValue {
  Incomplete = 'incomplete',
  PartiallyComplete = 'partiallyComplete',
  Complete = 'complete',
}

export type Size = 'small' | 'medium' | 'large';
