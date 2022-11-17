import '@shopify/react-testing/matchers';

import React from 'react';
import {Text} from '@shopify/polaris';

const mount = (..._: any) => {};
const MyComponent = () => <div />;

describe('MyComponent', () => {
  it('renders', () => {
    const container = mount(<MyComponent />);

    expect(container).not.toContainReactComponent(Text);
    expect(container).not.toContainReactComponent(Text);
    expect(container).not.toContainReactComponent(Text);
    expect(container).not.toContainReactComponent(Text);
    expect(container).not.toContainReactComponent(Text);
    expect(container).not.toContainReactComponent(Text);
  });
});
