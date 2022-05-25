export enum StatusValue {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Critical = 'critical',
  Attention = 'attention',
  New = 'new',
}
// uses template literal types to get the string representation of the values of the FieldsMap enums
export type Status = `${StatusValue}`;
export enum ProgressValue {
  Incomplete = 'incomplete',
  PartiallyComplete = 'partiallyComplete',
  Complete = 'complete',
}
export type Progress = `${ProgressValue}`;
export type Size = 'small' | 'medium';
