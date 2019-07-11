import React from 'react';
import {mount} from '@shopify/react-testing';
import {TestProvider} from '../TestProvider';

describe('TestProvider', () => {
  it("doesn't renders in strict mode by default", () => {
    const testProvider = mount(
      <TestProvider>
        <div>Hello</div>
      </TestProvider>,
    );

    expect(testProvider).not.toContainReactComponent(React.StrictMode);
  });

  it('renders in strict mode with strict', () => {
    const testProvider = mount(
      <TestProvider strict>
        <div>Hello</div>
      </TestProvider>,
    );

    expect(testProvider).toContainReactComponent(React.StrictMode);
  });
});
