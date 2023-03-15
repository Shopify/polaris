import {Page, LegacyCard} from '@shopify/polaris';
import {ExternalMinor} from '@shopify/polaris-icons';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      title="Jar With Lock-Lid"
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {
          content: 'Promote',
          external: true,
          icon: ExternalMinor,
          url: 'https://www.facebook.com/business/learn/facebook-page-build-audience',
        },
      ]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export default withPolarisExample(PageExample);
