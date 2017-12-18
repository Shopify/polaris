import {ActiveFilter, Filter} from './types';

export interface Props {
  filters: Filter[],
  resourceName?: {
    singular: string,
    plural: string,
  },
  onAddFilter?(filterKey: ActiveFilter['key'], filterValue: ActiveFilter['value']): void,
}

export default function FilterAdder({}: Props) {
  return null;
}
