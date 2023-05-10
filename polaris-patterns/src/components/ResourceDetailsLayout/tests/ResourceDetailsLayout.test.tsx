import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {ResourceDetailsLayout} from '../ResourceDetailsLayout';

describe('<ResourceDetailsLayout />', () => {
  it('renders children', () => {
    const layout = mountWithApp(
      <ResourceDetailsLayout>
        <MyComponent />
      </ResourceDetailsLayout>,
    );

    expect(layout).toContainReactComponent(MyComponent);
  });

  describe('<ResourceDetailsLayout.PrimarySection />', () => {
    it('renders children', () => {
      const primarySection = mountWithApp(
        <ResourceDetailsLayout.PrimarySection>
          <MyComponent />
        </ResourceDetailsLayout.PrimarySection>,
      );

      expect(primarySection).toContainReactComponent(MyComponent);
    });
  });

  describe('<ResourceDetailsLayout.SecondarySection />', () => {
    it('renders children', () => {
      const secondarySection = mountWithApp(
        <ResourceDetailsLayout.SecondarySection>
          <MyComponent />
        </ResourceDetailsLayout.SecondarySection>,
      );

      expect(secondarySection).toContainReactComponent(MyComponent);
    });
  });

  describe('<ResourceDetailsLayout.Card />', () => {
    it('renders children', () => {
      const card = mountWithApp(
        <ResourceDetailsLayout.Card>
          <MyComponent />
        </ResourceDetailsLayout.Card>,
      );

      expect(card).toContainReactComponent(MyComponent);
    });
  });
});

function MyComponent() {
  return <div />;
}
