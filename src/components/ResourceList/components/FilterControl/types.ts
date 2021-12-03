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

export interface FilterBase<FilterKeys = {[key: string]: unknown}> {
  label: string;
  key: keyof FilterKeys | string;
  operatorText?: string | Operator[];
  type: FilterType;
}

export interface FilterSelect<FilterKeys = {[key: string]: unknown}>
  extends FilterBase<FilterKeys> {
  type: FilterType.Select;
  options: SelectOption[];
}

export interface FilterTextField<FilterKeys = {[key: string]: unknown}>
  extends FilterBase<FilterKeys> {
  type: FilterType.TextField;
  textFieldType?: TextFieldProps['type'];
}

export interface FilterDateSelector<FilterKeys = {[key: string]: unknown}>
  extends FilterBase<FilterKeys> {
  type: FilterType.DateSelector;
  minKey: string;
  maxKey: string;
  dateOptionType?: 'past' | 'future' | 'full';
}

export type Filter<FilterKeys = {[key: string]: unknown}> =
  | FilterSelect<FilterKeys>
  | FilterTextField<FilterKeys>
  | FilterDateSelector<FilterKeys>;
