import type {ContextType, ReactElement} from 'react';
import {createMount} from '@shopify/react-testing';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {PolarisTestProvider} from '../../src/components/PolarisTestProvider';
import {ListboxContext} from '../../src/utilities/listbox';
import {
  ComboboxListboxContext,
  ComboboxListboxType,
} from '../../src/utilities/combobox';
import translations from '../../locales/en.json';

import {mountWithApp} from './react-testing';

const defaultContext: ContextType<typeof ListboxContext> = {
  onOptionSelect: noop,
  setLoading: noop,
};

export function mountWithListboxProvider(
  element: ReactElement,
  context: ContextType<typeof ListboxContext> = defaultContext,
) {
  return createMount({
    context: () => {
      return {context};
    },
    render(element: ReactElement) {
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
