import React from 'react';
import {mountWithAppProvider} from '../legacy';

describe('mountWithAppProvider', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('renders in strict mode', () => {
    // eslint-disable-next-line react/no-unsafe
    class Child extends React.Component {
      componentWillReceiveProps() {}

      render() {
        return null;
      }
    }

    mountWithAppProvider(<Child />);

    expect(consoleSpy).toHaveBeenCalledWith(
      `Warning: Unsafe lifecycle methods were found within a strict-mode tree:%s

%s

Learn more about this warning here:
https://fb.me/react-strict-mode-warnings`,
      expect.any(String),
      'componentWillReceiveProps: Please update the following components to use static getDerivedStateFromProps instead: Child',
    );
  });
});
