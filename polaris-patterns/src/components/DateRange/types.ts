import type {DatePeriod, QueryPeriod} from 'utilities/reportify';

export interface DateRange {
  alias: string;
  title: string;
  period: QueryPeriod | null;
}
export interface ComparisonRange {
  alias: string;
  title?: string;
  period(reportingPeriod: QueryPeriod, timeZone?: string): DatePeriod | null;
  condition?(period: DatePeriod): boolean;
}
