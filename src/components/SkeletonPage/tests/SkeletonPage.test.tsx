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
    it('renders title as DisplayText instead of SkeletonDisplayText when a title is provided', () => {
      const skeletonPage = mountWithAppProvider(
        <SkeletonPage title="Products" narrowWidth />,
      );
      const displayText = skeletonPage.find(DisplayText);
      expect(displayText).toHaveLength(1);
      expect(displayText.text()).toBe('Products');
      expect(skeletonPage.find(SkeletonDisplayText)).toHaveLength(0);
    });

    it('renders SkeletonDisplayText instead of DisplayText when a title is not provided', () => {
      const skeletonPage = mountWithAppProvider(<SkeletonPage fullWidth />);
      expect(skeletonPage.find(DisplayText)).toHaveLength(0);
      expect(skeletonPage.find(SkeletonDisplayText)).toHaveLength(1);
    });

    it('passes large to the size prop of DisplayText by default', () => {
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

    it('renders a SkeletonDisplayText instead of DisplayText when the title is an empty string', () => {
      const skeletonPage = mountWithAppProvider(<SkeletonPage title="" />);
      expect(skeletonPage.find(SkeletonDisplayText)).toHaveLength(1);
      expect(skeletonPage.find(DisplayText)).toHaveLength(0);
    });

    it('passes large to the size prop of SkeletonDisplayText by default', () => {
      const skeletonPage = mountWithAppProvider(<SkeletonPage title="" />);
      const skeletonDisplayText = skeletonPage.find(SkeletonDisplayText);
      expect(skeletonDisplayText.prop('size')).toBe('large');
    });

    describe('when the new design language is enabled', () => {
      it('renders an h1 with the newDesignLanguageTitle class instead of DisplayText when a title is defined', () => {
        const skeletonPage = mountWithAppProvider(
          <SkeletonPage title="Products" />,
          {
            features: {newDesignLanguage: true},
          },
        );

        expect(skeletonPage.find('h1.newDesignLanguageTitle')).toHaveLength(1);
        expect(skeletonPage.find(DisplayText)).toHaveLength(0);
      });

      it('renders newDesignLanguageSkeletonTitle when a title not defined', () => {
        const skeletonPage = mountWithAppProvider(<SkeletonPage />, {
          features: {newDesignLanguage: true},
        });

        expect(skeletonPage.find('h1.newDesignLanguageTitle')).toHaveLength(0);
        expect(
          skeletonPage.find('.newDesignLanguageSkeletonTitle'),
        ).toHaveLength(1);
      });

      it('renders newDesignLanguageSkeletonTitle when title is an empty string', () => {
        const skeletonPage = mountWithAppProvider(<SkeletonPage title="" />, {
          features: {newDesignLanguage: true},
        });

        expect(skeletonPage.find('h1.newDesignLanguageTitle')).toHaveLength(0);
        expect(
          skeletonPage.find('.newDesignLanguageSkeletonTitle'),
        ).toHaveLength(1);
      });
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
