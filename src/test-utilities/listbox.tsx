import React, {ReactElement} from 'react';
import {createMount} from '@shopify/react-testing';

import {PolarisTestProvider} from '../components';
import {ListboxContext} from '../utilities/listbox';
import {
  ComboboxListboxContext,
  ComboboxListboxType,
} from '../utilities/combobox';
import translations from '../../locales/en.json';

import {mountWithApp} from './react-testing';

const defaultContext: React.ContextType<typeof ListboxContext> = {
  onOptionSelect: noop,
  setLoading: noop,
};

export function mountWithListboxProvider(
  element: React.ReactElement,
  context: React.ContextType<typeof ListboxContext> = defaultContext,
) {
  return createMount({
    context: () => {
      return {context};
    },
    render(element: React.ReactElement) {
      return (
        <PolarisTestProvider
          i18n={translations}
          features={{newDesignLanguage: true}}
        >
          <ListboxContext.Provider value={context}>
            {element}
          </ListboxContext.Provider>
        </PolarisTestProvider>
      );
    },
  })(element);
}

export function mountWithComboboxListContext(
  listbox: ReactElement,
  context: ComboboxListboxType = {},
) {
  const comboxBox = mountWithApp(
    <ComboboxListboxContext.Provider
      value={{
        setActiveOptionId: () => null,
        ...context,
      }}
    >
      {listbox}
    </ComboboxListboxContext.Provider>,
  );
  return comboxBox;
}

function noop() {}
