import React from 'react';
import type {ReactElement} from 'react';
import {createMount} from '@shopify/react-testing';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {PolarisTestProvider} from '../../src/components/PolarisTestProvider';
import {ListboxContext} from '../../src/utilities/listbox';
import {ComboboxListboxContext} from '../../src/utilities/combobox';
import type {ComboboxListboxType} from '../../src/utilities/combobox';
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
  // This is probably a legit error but I don't have the time to refactor this
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const providerValue = {
    setActiveOptionId: () => null,
    ...context,
  };

  const comboxBox = mountWithApp(
    <ComboboxListboxContext.Provider value={providerValue}>
      {listbox}
    </ComboboxListboxContext.Provider>,
  );
  return comboxBox;
}

function noop() {}
