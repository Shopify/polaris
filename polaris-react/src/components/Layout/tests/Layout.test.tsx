import {mountWithApp} from 'tests/utilities';

import {Heading} from '../../Heading';
import {TextContainer} from '../../TextContainer';
import {Section} from '../components';
import {Layout} from '../Layout';
import styles from '../Layout.scss';

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

  describe('<Layout.AnnotatedSection />', () => {
    it('renders children', () => {
      const annotatedSection = mountWithApp(
        <Layout.AnnotatedSection>
          <MyComponent />
        </Layout.AnnotatedSection>,
      );

      expect(annotatedSection).toContainReactComponent(MyComponent);
    });

    it('renders a title', () => {
      const title = 'Store details';
      const annotatedSection = mountWithApp(
        <Layout.AnnotatedSection title={title} id="someId" />,
      );
      expect(annotatedSection.find(Heading, {id: 'someId'})).toContainReactText(
        title,
      );
    });

    it('renders a description as a string', () => {
      const description = 'A good description of this section';
      const annotatedSection = mountWithApp(
        <Layout.AnnotatedSection description={description} />,
      );

      const annotedDescriptionTextContainer =
        annotatedSection.find(TextContainer)!;

      expect(annotedDescriptionTextContainer.find('div')).toContainReactText(
        description,
      );
    });

    it('renders a description as a node', () => {
      const annotatedSection = mountWithApp(
        <Layout.AnnotatedSection description={<MyComponent />} />,
      );

      const annotedDescriptionTextContainer =
        annotatedSection.find(TextContainer)!;

      expect(annotedDescriptionTextContainer).toContainReactComponent(
        MyComponent,
      );
    });

    it('does not render an empty description node', () => {
      const annotatedSection = mountWithApp(
        <Layout.AnnotatedSection>
          <MyComponent />
        </Layout.AnnotatedSection>,
      );

      const annotedDescriptionTextContainer =
        annotatedSection.find(TextContainer)!;

      expect(annotatedSection).toContainReactComponent(TextContainer);
      expect(annotedDescriptionTextContainer).not.toContainReactComponent(
        'div',
        {
          className: expect.stringContaining(styles.AnnotationDescription),
        },
      );
    });

    it('passes through an ID for deeplinking', () => {
      const layout = mountWithApp(
        <Layout>
          <Layout.AnnotatedSection id="MySection">
            <MyComponent />
          </Layout.AnnotatedSection>
        </Layout>,
      );
      expect(layout).toContainReactComponent(Heading, {id: 'MySection'});
    });
  });
});

function MyComponent() {
  return <div />;
}
