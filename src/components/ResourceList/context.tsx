import React from 'react';
import {Intl} from '../AppProvider';
import {SelectedItems} from './types';

export interface ResourceListContextType {
  selectMode: boolean;
  selectable?: boolean;
  selectedItems?: SelectedItems;
  resourceName: {
    singular: string;
    plural: string;
  };
  loading?: boolean;
  onSelectionChange?(selected: boolean, id: string): void;
}

const intl = new Intl(undefined);

const ResourceListContext = React.createContext<ResourceListContextType>({
  selectMode: false,
  resourceName: {
    singular: intl.translate('Polaris.ResourceList.defaultItemSingular'),
    plural: intl.translate('Polaris.ResourceList.defaultItemPlural'),
  },
});

export default ResourceListContext;
