import React from 'react';
import {mountWithApp} from 'test-utilities';
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
    const Children = () => {
      return (
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
    };

    const skeletonPage = mountWithApp(
      <SkeletonPage title="Products">
        <Children />
      </SkeletonPage>,
    );
    expect(skeletonPage).toContainReactComponent(Children);
  });

  describe('title', () => {
    it('renders an h1 with the Title class when title is defined', () => {
      const skeletonPage = mountWithApp(<SkeletonPage title="Products" />);

      expect(skeletonPage).toContainReactComponent('h1', {className: 'Title'});
      expect(skeletonPage).not.toContainReactComponent(DisplayText);
    });

    it('renders SkeletonTitle when a title not defined', () => {
      const skeletonPage = mountWithApp(<SkeletonPage />);

      expect(skeletonPage).not.toContainReactComponent('h1', {
        className: 'Title',
      });
      expect(skeletonPage).toContainReactComponent('div', {
        className: 'SkeletonTitle',
      });
    });

    it('renders SkeletonTitle when title is an empty string', () => {
      const skeletonPage = mountWithApp(<SkeletonPage title="" />);

      expect(skeletonPage).not.toContainReactComponent('h1', {
        className: 'Title',
      });
      expect(skeletonPage).toContainReactComponent('div', {
        className: 'SkeletonTitle',
      });
    });
  });

  it('renders the provided number of secondary actions as SkeletonBodyText', () => {
    const skeletonPage = mountWithApp(<SkeletonPage secondaryActions={3} />);
    expect(skeletonPage).toContainReactComponentTimes(SkeletonBodyText, 3);
  });

  it('renders breadcrumbs', () => {
    const skeletonPage = mountWithApp(<SkeletonPage breadcrumbs />);
    expect(skeletonPage).toContainReactComponent(SkeletonBodyText);
  });

  describe('primaryAction', () => {
    it('renders SkeletonDisplayText if true', () => {
      const skeletonPage = mountWithApp(
        <SkeletonPage title="Title" primaryAction />,
      );
      expect(skeletonPage).toContainReactComponent(SkeletonDisplayText);
    });
  });
});
