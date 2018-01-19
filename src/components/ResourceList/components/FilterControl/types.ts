import {Option} from '../../../Select';

export interface AppliedFilter {
  key: string,
  value: string,
}

export enum FilterType {
  Select,
  TextField,
}

export interface FilterBase<FilterKeys = {}> {
  label: string,
  key: keyof FilterKeys | string,
  operatorText?: string,
  type: FilterType,
}

export interface FilterSelect<FilterKeys = {}>
  extends FilterBase<FilterKeys> {
  type: FilterType.Select,
  options: Option[],
}

export interface FilterTextField<FilterKeys = {}>
  extends FilterBase<FilterKeys> {
  type: FilterType.TextField,
}

export type Filter<FilterKeys = {}> =
  | FilterSelect<FilterKeys>
  | FilterTextField<FilterKeys>;
