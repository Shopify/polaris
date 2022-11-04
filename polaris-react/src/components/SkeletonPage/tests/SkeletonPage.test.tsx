import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Card} from '../../Card';
import {Text} from '../../Text';
import {Layout} from '../../Layout';
import {SkeletonBodyText} from '../../SkeletonBodyText';
import {SkeletonDisplayText} from '../../SkeletonDisplayText';
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
      expect(skeletonPage).not.toContainReactComponent(Text);
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
