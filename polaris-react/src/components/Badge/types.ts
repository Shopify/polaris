type Experimental<T extends string> = `${T}-experimental`;

export type Status =
  | 'info'
  | 'success'
  | 'warning'
  | 'critical'
  | 'attention'
  | 'new'
  | Experimental<'info-strong'>
  | Experimental<'success-strong'>
  | Experimental<'warning-strong'>
  | Experimental<'critical-strong'>
  | Experimental<'attention-strong'>
  | Experimental<'read-only'>
  | Experimental<'enabled'>;

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
