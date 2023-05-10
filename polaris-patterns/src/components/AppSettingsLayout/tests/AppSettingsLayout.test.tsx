import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {Text} from '@shopify/polaris';

import {AppSettingsLayout} from '../AppSettingsLayout';

describe('<AppSettingsLayout />', () => {
  it('renders children', () => {
    const layout = mountWithApp(
      <AppSettingsLayout>
        <MyComponent />
      </AppSettingsLayout>,
    );

    expect(layout).toContainReactComponent(MyComponent);
  });

  describe('<AppSettingsLayout.AnnotatedSection />', () => {
    it('renders children', () => {
      const annotatedSection = mountWithApp(
        <AppSettingsLayout.AnnotatedSection>
          <MyComponent />
        </AppSettingsLayout.AnnotatedSection>,
      );

      expect(annotatedSection).toContainReactComponent(MyComponent);
    });

    it('renders a title', () => {
      const title = 'Store details';
      const annotatedSection = mountWithApp(
        <AppSettingsLayout.AnnotatedSection title={title} id="someId" />,
      );
      expect(annotatedSection.find(Text, {id: 'someId'})).toContainReactText(
        title,
      );
    });

    it('renders a description as a string', () => {
      const description = 'A good description of this section';
      const annotatedSection = mountWithApp(
        <AppSettingsLayout.AnnotatedSection description={description} />,
      );

      expect(annotatedSection.find(Text, {as: 'p'})).toContainReactText(
        description,
      );
    });

    it('renders a description as a node', () => {
      const annotatedSection = mountWithApp(
        <AppSettingsLayout.AnnotatedSection description={<MyComponent />} />,
      );

      expect(annotatedSection).toContainReactComponent(MyComponent);
    });

    it('does not render an empty description node', () => {
      const annotatedSection = mountWithApp(
        <AppSettingsLayout.AnnotatedSection>
          <MyComponent />
        </AppSettingsLayout.AnnotatedSection>,
      );

      expect(annotatedSection.find(Text, {as: 'p'})).toBeNull();
    });

    it('passes through an ID for deeplinking', () => {
      const layout = mountWithApp(
        <AppSettingsLayout>
          <AppSettingsLayout.AnnotatedSection id="MySection">
            <MyComponent />
          </AppSettingsLayout.AnnotatedSection>
        </AppSettingsLayout>,
      );
      expect(layout).toContainReactComponent(Text, {id: 'MySection'});
    });
  });

  describe('<AppSettingsLayout.Card />', () => {
    it('renders children', () => {
      const card = mountWithApp(
        <AppSettingsLayout.Card>
          <MyComponent />
        </AppSettingsLayout.Card>,
      );

      expect(card).toContainReactComponent(MyComponent);
    });
  });
});

function MyComponent() {
  return <div />;
}
