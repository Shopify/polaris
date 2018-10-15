import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'test-utilities';
import Alert from '../Alert';

describe('<Alert>', () => {
  it('throws an error if child is not a string', () => {
    const alertContent: any = <p>Test</p>;
    /* eslint-disable no-console */
    const originalConsoleError = console.error;
    console.error = () => {};
    expect(() =>
      mountWithAppProvider(
        <Alert open confirmContent="ok" onConfirm={noop}>
          {alertContent}
        </Alert>,
      ),
    ).toThrow();
    console.error = originalConsoleError;
    /* eslint-enable no-console */
  });
  it('does not throw an error if child is a string', () => {
    expect(() =>
      mountWithAppProvider(
        <Alert open confirmContent="ok" onConfirm={noop}>
          Test
        </Alert>,
      ),
    ).not.toThrow();
  });
});
