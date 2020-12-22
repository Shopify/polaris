import React, {ReactElement} from 'react';
import {createMount} from '@shopify/react-testing';
import {PolarisTestProvider} from '@shopify/polaris';
import {mountWithAppContext} from 'tests/modern';

import {ComboBoxListBoxContext, ComboBoxListBoxType} from '../../ComboBox';
import {ListBoxContext} from '../utilities/context/list-box';

const defaultContext: React.ContextType<typeof ListBoxContext> = {
  onOptionSelect: noop,
  setLoading: noop,
};

export function mountWithListBoxProvider(
  element: React.ReactElement,
  context: React.ContextType<typeof ListBoxContext> = defaultContext,
) {
  return createMount({
    context: () => {
      return {context};
    },
    render: (element: React.ReactElement) => {
      return (
        <PolarisTestProvider features={{newDesignLanguage: true}}>
          <ListBoxContext.Provider value={context}>
            {element}
          </ListBoxContext.Provider>
        </PolarisTestProvider>
      );
    },
  })(element);
}

export function mountWithComboBoxListContext(
  listbox: ReactElement,
  context: ComboBoxListBoxType = {},
) {
  const comboxBox = mountWithAppContext(
    <ComboBoxListBoxContext.Provider
      value={{
        setActiveOptionId: () => null,
        ...context,
      }}
    >
      {listbox}
    </ComboBoxListBoxContext.Provider>,
  );
  return comboxBox;
}

function noop() {}
