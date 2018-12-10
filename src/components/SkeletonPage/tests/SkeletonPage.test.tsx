import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {
  Layout,
  Card,
  SkeletonBodyText,
  DisplayText,
  SkeletonDisplayText,
} from 'components';
import SkeletonPage from '../SkeletonPage';

describe('<SkeletonPage />', () => {
  it('renders its children', () => {
    const children = (
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
          <Card sectioned title="Variants">
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
      </Layout>
    );

    const skeletonPage = mountWithAppProvider(
      <SkeletonPage title="Products">{children}</SkeletonPage>,
    );
    expect(skeletonPage.contains(children)).toBe(true);
  });

  describe('title', () => {
    it('renders title when a title is provided', () => {
      const skeletonPage = mountWithAppProvider(
        <SkeletonPage title="Products" />,
      );
      const displayText = skeletonPage.find(DisplayText);
      expect(displayText).toHaveLength(1);
      expect(displayText.text()).toBe('Products');
    });

    it('passes large to the size prop of DisplayText', () => {
      const skeletonPage = mountWithAppProvider(
        <SkeletonPage title="Products" />,
      );
      const displayText = skeletonPage.find(DisplayText);
      expect(displayText.prop('size')).toBe('large');
    });

    it('passes h1 to the element prop of DisplayText', () => {
      const skeletonPage = mountWithAppProvider(
        <SkeletonPage title="Products" />,
      );
      const displayText = skeletonPage.find(DisplayText);
      expect(displayText.prop('element')).toBe('h1');
    });

    it('renders a SkeletonDisplayText when the title is an empty string', () => {
      const skeletonPage = mountWithAppProvider(<SkeletonPage title="" />);
      expect(skeletonPage.find(SkeletonDisplayText)).toHaveLength(1);
    });

    it('passes large to the size prop of SkeletonDisplayText', () => {
      const skeletonPage = mountWithAppProvider(<SkeletonPage title="" />);
      const skeletonDisplayText = skeletonPage.find(SkeletonDisplayText);
      expect(skeletonDisplayText.prop('size')).toBe('large');
    });
  });

  it('renders the correct number of secondary actions as SkeletonBodyText', () => {
    const skeletonPage = mountWithAppProvider(
      <SkeletonPage secondaryActions={3} />,
    );
    expect(skeletonPage.find(SkeletonBodyText)).toHaveLength(3);
  });

  it('renders breadcrumbs', () => {
    const skeletonPage = mountWithAppProvider(<SkeletonPage breadcrumbs />);
    expect(skeletonPage.find(SkeletonBodyText)).toHaveLength(1);
  });

  describe('primaryAction', () => {
    it('renders SkeletonDisplayText if true', () => {
      const skeletonPage = mountWithAppProvider(
        <SkeletonPage title="Title" primaryAction />,
      );
      expect(skeletonPage.find(SkeletonDisplayText)).toHaveLength(1);
    });
  });
});
