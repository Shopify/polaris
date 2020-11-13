import React from 'react';
import {mountWithAppContext} from 'tests/modern';

import {IndexProvider} from '../IndexProvider';
import {IndexRowContext} from '../utilities/context';

describe('<IndexProvider />', () => {
  const defaultProps = {
    itemCount: 0,
    selectedItemsCount: 0,
  };

  it('renders a IndexRowContextProvider', async () => {
    const indexProvider = await mountWithAppContext(
      <IndexProvider {...defaultProps} />,
    );

    expect(indexProvider).toContainReactComponent(IndexRowContext.Provider);
  });
});
