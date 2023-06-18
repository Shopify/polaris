export enum TimeUnit {
  Millisecond,
  Second,
  Minute,
  Hour,
  Day = 'd',
  Week = 'w',
  Month = 'm',
  Quarter = 'q',
  Year = 'y',
}

export interface RelativeDateParts {
  quantity: number;
  unit: TimeUnit;
}

export interface DatePeriod {
  since: Date;
  until: Date;
}

export type OverPeriod = 'hour' | 'day' | 'week' | 'month' | 'year';
