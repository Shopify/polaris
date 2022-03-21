import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {IndexProvider} from '../IndexProvider';
import {IndexRowContext} from '../../../utilities/index-provider';

describe('<IndexProvider />', () => {
  const defaultProps = {
    itemCount: 0,
    selectedItemsCount: 0,
    onSelectionChange: () => {},
  };

  it('renders a IndexRowContextProvider', () => {
    const indexProvider = mountWithApp(<IndexProvider {...defaultProps} />);

    expect(indexProvider).toContainReactComponent(IndexRowContext.Provider);
  });
});
