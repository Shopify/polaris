import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Section} from '../components';
import {Layout} from '../Layout';

describe('<Layout />', () => {
  it('renders children', () => {
    const layout = mountWithApp(
      <Layout>
        <MyComponent />
      </Layout>,
    );

    expect(layout).toContainReactComponent(MyComponent);
  });

  it('renders children wrapped in a section', () => {
    const layout = mountWithApp(
      <Layout sectioned>
        <MyComponent />
      </Layout>,
    );

    expect(layout).toContainReactComponent(Section);
    expect(layout.find(Section)).toContainReactComponent(MyComponent);
  });
});

function MyComponent() {
  return <div />;
}
