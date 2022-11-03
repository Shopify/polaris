import '@shopify/react-testing/matchers';

import React from 'react';
import {
  DisplayText,
  Heading,
  Subheading,
  Caption,
  TextStyle,
  VisuallyHidden,
} from '@shopify/polaris';

const mount = (..._: any) => {};
const MyComponent = () => <div />;

describe('MyComponent', () => {
  it('renders', () => {
    const container = mount(<MyComponent />);

    expect(container).not.toContainReactComponent(DisplayText);
    expect(container).not.toContainReactComponent(Heading);
    expect(container).not.toContainReactComponent(Subheading);
    expect(container).not.toContainReactComponent(Caption);
    expect(container).not.toContainReactComponent(TextStyle);
    expect(container).not.toContainReactComponent(VisuallyHidden);
  });
});
