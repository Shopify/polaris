import React from 'react';
import {mount} from '@shopify/react-testing';
import {PolarisTestProvider} from '../PolarisTestProvider';

describe('PolarisTestProvider', () => {
  it("doesn't render in strict mode by default", () => {
    const polarisTestProvider = mount(
      <PolarisTestProvider>
        <div>Hello</div>
      </PolarisTestProvider>,
    );

    expect(polarisTestProvider).not.toContainReactComponent(React.StrictMode);
  });

  it('renders in strict mode with strict', () => {
    const polarisTestProvider = mount(
      <PolarisTestProvider strict>
        <div>Hello</div>
      </PolarisTestProvider>,
    );

    expect(polarisTestProvider).toContainReactComponent(React.StrictMode);
  });
});
