import type {SelectOption} from '../../../Select';
import type {TextFieldProps} from '../../../TextField';

export interface Operator {
  key: string;
  optionLabel: string;
  filterLabel?: string;
}

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

export interface FilterBase<TFilterKeys = {[key: string]: unknown}> {
  label: string;
  key: keyof TFilterKeys | string;
  operatorText?: string | Operator[];
  type: FilterType;
}

export interface FilterSelect<TFilterKeys = {[key: string]: unknown}>
  extends FilterBase<TFilterKeys> {
  type: FilterType.Select;
  options: SelectOption[];
}

export interface FilterTextField<TFilterKeys = {[key: string]: unknown}>
  extends FilterBase<TFilterKeys> {
  type: FilterType.TextField;
  textFieldType?: TextFieldProps['type'];
}

export interface FilterDateSelector<TFilterKeys = {[key: string]: unknown}>
  extends FilterBase<TFilterKeys> {
  type: FilterType.DateSelector;
  minKey: string;
  maxKey: string;
  dateOptionType?: 'past' | 'future' | 'full';
}

export type Filter<TFilterKeys = {[key: string]: unknown}> =
  | FilterSelect<TFilterKeys>
  | FilterTextField<TFilterKeys>
  | FilterDateSelector<TFilterKeys>;
