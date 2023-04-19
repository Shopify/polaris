export interface StringDatePeriod {
  since: string;
  until: string;
}

export interface DateRangePickerPeriod {
  since: Date;
  until: Date;
}

export interface DateRangePickerRange {
  period: DateRangePickerPeriod;
  title?: string;
  alias?: string;
}

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

export interface DatePeriod {
  since: Date;
  until: Date;
}
export interface QueryPeriod {
  since: string;
  until: string;
}

export interface RelativeDateParts {
  quantity: number;
  unit: TimeUnit;
}
