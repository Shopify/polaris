import React from 'react';
import {mountWithApp, mount} from 'test-utilities';

import {IndexRowContext} from '../context';
import {useIndexRow} from '../hooks';

describe('useIndexRow', () => {
  it('returns selectMode & condensed', () => {
    const spy = jest.fn();

    function MockComponent() {
      const value = useIndexRow();
      spy(value);
      return null;
    }

    mountWithApp(
      <IndexRowContext.Provider value={{selectMode: true, condensed: true}}>
        <MockComponent />
      </IndexRowContext.Provider>,
    );

    expect(spy).toHaveBeenCalledWith({selectMode: true, condensed: true});
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
