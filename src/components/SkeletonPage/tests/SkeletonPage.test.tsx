import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import {Layout, Card, SkeletonBodyText, DisplayText} from 'components';
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

  it('renders the title', () => {
    const skeletonPage = mountWithAppProvider(
      <SkeletonPage title="Products" />,
    );
    expect(skeletonPage.find(DisplayText).length).toBe(1);
    expect(skeletonPage.find(DisplayText).contains('Products')).toBe(true);
  });

  it('renders the correct number of secondary actions as SkeletonBodyText', () => {
    const skeletonPage = mountWithAppProvider(
      <SkeletonPage secondaryActions={3} />,
    );
    expect(skeletonPage.find(SkeletonBodyText).length).toBe(3);
  });

  it('renders breadcrumbs', () => {
    const skeletonPage = mountWithAppProvider(<SkeletonPage breadcrumbs />);
    expect(skeletonPage.find(SkeletonBodyText).length).toBe(1);
  });
});
