import React from 'react';
import {mountWithAppContext, mount} from 'tests/modern';

import {IndexProvider, useIndexRow} from '../IndexProvider';

describe('useIndexRow', () => {
  const defaultIndexProviderProps = {
    itemCount: 0,
    selectedItemsCount: 0,
  };

  it('returns selectMode', async () => {
    const spy = jest.fn();

    function MockComponent() {
      const value = useIndexRow();
      spy(value);
      return null;
    }

    await mountWithAppContext(
      <IndexProvider {...defaultIndexProviderProps}>
        <MockComponent />
      </IndexProvider>,
    );

    expect(spy).toHaveBeenCalledWith({selectMode: false});
  });

  it('throws when IndexProvider is not being used', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    function callback() {
      function MockComponent() {
        useIndexRow();
        return null;
      }

      mount(<MockComponent />);
    }

    expect(callback).toThrow(`Missing IndexProvider context`);

    consoleErrorSpy.mockRestore();
  });
});
