import React from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line import/no-deprecated
import {LegacyCard} from '../../LegacyCard';
import {Layout} from '../../Layout';
import {SkeletonBodyText} from '../../SkeletonBodyText';
import {SkeletonPage} from '../SkeletonPage';
import {Box} from '../../Box';

describe('<SkeletonPage />', () => {
  it('renders its children', () => {
    const Children = () => {
      return (
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <SkeletonBodyText />
            </LegacyCard>
            <LegacyCard sectioned title="Variants">
              <SkeletonBodyText />
            </LegacyCard>
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
      expect(skeletonPage).not.toContainReactComponent(Box, {
        background: 'bg-fill-tertiary',
      });
    });

    it('renders SkeletonTitle when a title not defined', () => {
      const skeletonPage = mountWithApp(<SkeletonPage />);

      expect(skeletonPage).not.toContainReactComponent('h1', {
        className: 'Title',
      });
      expect(skeletonPage).toContainReactComponent(Box, {
        background: 'bg-fill-tertiary',
      });
    });

    it('renders SkeletonTitle when title is an empty string', () => {
      const skeletonPage = mountWithApp(<SkeletonPage title="" />);

      expect(skeletonPage).not.toContainReactComponent('h1', {
        className: 'Title',
      });
      expect(skeletonPage).toContainReactComponent(Box, {
        background: 'bg-fill-tertiary',
      });
    });
  });

  describe('subtitle', () => {
    it('renders a div with the SubTitle class and a child p element when subtitle is defined', () => {
      const subtitleText = 'Manage your product catalog';
      const skeletonPage = mountWithApp(
        <SkeletonPage subtitle={subtitleText} />,
      );

      expect(skeletonPage).toContainReactComponent('div', {
        className: 'SubTitle',
      });

      const subTitleDiv = skeletonPage.find('div', {className: 'SubTitle'});
      expect(subTitleDiv).toContainReactComponent('p', {
        children: subtitleText,
      });
    });

    it('renders nothing when subtitle is not defined', () => {
      const skeletonPage = mountWithApp(<SkeletonPage />);

      expect(skeletonPage).not.toContainReactComponent('div', {
        className: 'SubTitle',
      });
    });

    it('renders nothing when subtitle is empty', () => {
      const skeletonPage = mountWithApp(<SkeletonPage subtitle="" />);

      expect(skeletonPage).not.toContainReactComponent('div', {
        className: 'SubTitle',
      });
    });
  });

  it('renders backAction', () => {
    const skeletonPage = mountWithApp(<SkeletonPage backAction />);
    expect(skeletonPage).toContainReactComponent(Box, {
      background: 'bg-fill-tertiary',
      minWidth: '2.25rem',
      minHeight: '2.25rem',
      maxWidth: '2.25rem',
    });
  });

  describe('primaryAction', () => {
    it('renders if true', () => {
      const skeletonPage = mountWithApp(
        <SkeletonPage title="Title" primaryAction />,
      );
      expect(skeletonPage).toContainReactComponent(Box, {
        id: 'SkeletonPage-PrimaryAction',
      });
    });
  });
});
