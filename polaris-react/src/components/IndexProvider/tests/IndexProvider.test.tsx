import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {setMatchMedia} from 'tests/setup/tests';

import {IndexProvider} from '../IndexProvider';
import {
  IndexRowContext,
  IndexCellContext,
  IndexCellPreviewContext,
} from '../../../utilities/index-provider';

jest.mock('../../../utilities/breakpoints', () => ({
  ...(jest.requireActual('../../../utilities/breakpoints') as any),
  useBreakpoints: jest.fn(),
}));

function mockUseBreakpoints(mdUp: boolean) {
  const useBreakpoints: jest.Mock = jest.requireMock(
    '../../../utilities/breakpoints',
  ).useBreakpoints;

  useBreakpoints.mockReturnValue({
    mdUp,
  });
}

setMatchMedia();

describe('<IndexProvider />', () => {
  const defaultProps = {
    itemCount: 0,
    selectedItemsCount: 0,
    onSelectionChange: () => {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    matchMedia.mock();
    mockUseBreakpoints(false);
  });

  afterEach(() => {
    matchMedia.restore();
  });

  it('renders IndexRowContextProvider', () => {
    const indexProvider = mountWithApp(<IndexProvider {...defaultProps} />);

    expect(indexProvider).toContainReactComponent(IndexRowContext.Provider);
  });

  it('renders IndexCellContextProvider', () => {
    const indexProvider = mountWithApp(<IndexProvider {...defaultProps} />);

    expect(indexProvider).toContainReactComponent(IndexCellContext.Provider);
  });

  it('renders IndexCellPreviewContextProvider', () => {
    const indexProvider = mountWithApp(<IndexProvider {...defaultProps} />);

    expect(indexProvider).toContainReactComponent(
      IndexCellPreviewContext.Provider,
    );
  });
});
