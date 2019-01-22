import * as React from 'react';
import {Intl} from '../../../AppProvider';
import {ResourceListContext} from '../../types';

const intl = new Intl(undefined);

const {Provider, Consumer} = React.createContext<ResourceListContext>({
  selectMode: false,
  resourceName: {
    singular: intl.translate('Polaris.ResourceList.defaultItemSingular'),
    plural: intl.translate('Polaris.ResourceList.defaultItemPlural'),
  },
});

export {Provider, Consumer};
