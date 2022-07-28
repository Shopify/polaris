export type Status =
  | 'info'
  | 'success'
  | 'warning'
  | 'critical'
  | 'attention'
  | 'new';

export enum StatusValue {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Critical = 'critical',
  Attention = 'attention',
  New = 'new',
}

export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

export enum ProgressValue {
  Incomplete = 'incomplete',
  PartiallyComplete = 'partiallyComplete',
  Complete = 'complete',
}

export type Size = 'small' | 'medium';
