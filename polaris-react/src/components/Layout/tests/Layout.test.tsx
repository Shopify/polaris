import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Grid} from '../../Grid';
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

  it('renders a Grid', () => {
    const layout = mountWithApp(
      <Layout>
        <MyComponent />
      </Layout>,
    );

    expect(layout).toContainReactComponent(Grid);
  });
});

function MyComponent() {
  return <div />;
}
