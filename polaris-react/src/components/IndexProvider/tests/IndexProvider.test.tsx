import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {IndexProvider} from '../IndexProvider';
import type {IndexProviderProps} from '../../../utilities/index-provider';
import {IndexRowContext} from '../../../utilities/index-provider';

describe('<IndexProvider />', () => {
  const defaultProps: IndexProviderProps = {
    itemCount: 10,
    pageCount: 10,
    pageSelectionRange: [0, 9],
    selectedItemsCount: 0,
    onSelectionChange: () => {},
  };

  it('renders a IndexRowContextProvider', () => {
    const indexProvider = mountWithApp(<IndexProvider {...defaultProps} />);

    expect(indexProvider).toContainReactComponent(IndexRowContext.Provider);
  });
});
