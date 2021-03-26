import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {
  Layout,
  Card,
  SkeletonBodyText,
  DisplayText,
  SkeletonDisplayText,
} from 'components';

import {SkeletonPage} from '../SkeletonPage';

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
    it('renders an h1 with the Title class when title is defined', () => {
      const skeletonPage = mountWithAppProvider(
        <SkeletonPage title="Products" />,
      );

      expect(skeletonPage.find('h1.Title')).toHaveLength(1);
      expect(skeletonPage.find(DisplayText)).toHaveLength(0);
    });

    it('renders SkeletonTitle when a title not defined', () => {
      const skeletonPage = mountWithAppProvider(<SkeletonPage />);

      expect(skeletonPage.find('h1.Title')).toHaveLength(0);
      expect(skeletonPage.find('.SkeletonTitle')).toHaveLength(1);
    });

    it('renders SkeletonTitle when title is an empty string', () => {
      const skeletonPage = mountWithAppProvider(<SkeletonPage title="" />);

      expect(skeletonPage.find('h1.Title')).toHaveLength(0);
      expect(skeletonPage.find('.SkeletonTitle')).toHaveLength(1);
    });
  });

  it('renders the provided number of secondary actions as SkeletonBodyText', () => {
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
