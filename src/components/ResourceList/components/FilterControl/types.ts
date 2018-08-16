import {Option} from '../../../Select';

export interface AppliedFilter {
  key: string;
  value: string;
  label?: string;
}

export enum FilterType {
  Select,
  TextField,
  DateSelector,
}

export interface FilterBase<FilterKeys = {}> {
  label: string;
  key: keyof FilterKeys | string;
  operatorText?: string;
  type: FilterType;
}

export interface FilterSelect<FilterKeys = {}> extends FilterBase<FilterKeys> {
  type: FilterType.Select;
  options: Option[];
}

export interface FilterTextField<FilterKeys = {}>
  extends FilterBase<FilterKeys> {
  type: FilterType.TextField;
}

export interface FilterDateSelector<FilterKeys = {}>
  extends FilterBase<FilterKeys> {
  type: FilterType.DateSelector;
  minKey: string;
  maxKey: string;
  dateOptionType?: 'past' | 'future' | 'full';
}

export type Filter<FilterKeys = {}> =
  | FilterSelect<FilterKeys>
  | FilterTextField<FilterKeys>
  | FilterDateSelector<FilterKeys>;
