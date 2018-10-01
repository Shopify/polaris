import * as React from 'react';
import {
  findByTestID,
  matchByTestID,
  mountWithAppProvider,
} from 'tests/utilities';
import {Section} from '../components';
import Layout from '../Layout';

describe('<Layout />', () => {
  it('renders children', () => {
    const layout = mountWithAppProvider(
      <Layout>
        <MyComponent />
      </Layout>,
    );

    expect(layout.find(MyComponent).exists()).toBe(true);
  });

  it('renders children wrapped in a section', () => {
    const layout = mountWithAppProvider(
      <Layout sectioned>
        <MyComponent />
      </Layout>,
    );
    const section = layout.find(Section);

    expect(section.exists()).toBe(true);
    expect(section.find(MyComponent).exists()).toBe(true);
  });

  describe('<Layout.Section />', () => {
    it('renders a full width section', () => {
      const section = mountWithAppProvider(<Layout.Section fullWidth />);

      expect(section.prop('fullWidth')).toBe(true);
    });

    it('renders a secondary section', () => {
      const section = mountWithAppProvider(<Layout.Section secondary />);

      expect(section.prop('secondary')).toBe(true);
    });
  });

  describe('<Layout.AnnotatedSection />', () => {
    it('renders children', () => {
      const annotatedSection = mountWithAppProvider(
        <Layout.AnnotatedSection>
          <MyComponent />
        </Layout.AnnotatedSection>,
      );

      expect(annotatedSection.find(MyComponent).exists()).toBe(true);
    });

    it('renders a title', () => {
      const title = 'Store details';
      const annotatedSection = mountWithAppProvider(
        <Layout.AnnotatedSection title={title} />,
      );

      expect(findByTestID(annotatedSection, 'AnnotationTitle').text()).toBe(
        title,
      );
    });

    it('renders a description as a string', () => {
      const description = 'A good description of this section';
      const annotatedSection = mountWithAppProvider(
        <Layout.AnnotatedSection description={description} />,
      );

      expect(
        findByTestID(annotatedSection, 'AnnotationDescription').text(),
      ).toBe(description);
    });

    it('renders a description as a node', () => {
      const annotatedSection = mountWithAppProvider(
        <Layout.AnnotatedSection description={<MyComponent />} />,
      );
      const annotatedDescription = findByTestID(
        annotatedSection,
        'AnnotationDescription',
      );

      expect(annotatedDescription.find(MyComponent).exists()).toBe(true);
    });

    it('does not render an empty description node', () => {
      const annotatedSection = mountWithAppProvider(
        <Layout.AnnotatedSection>
          <MyComponent />
        </Layout.AnnotatedSection>,
      );
      const description = matchByTestID(
        annotatedSection,
        /AnnotationDescription/,
      );

      expect(description.exists()).toBe(false);
    });
  });
});

function MyComponent() {
  return <div />;
}
