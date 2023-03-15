import {Page, LegacyCard} from '@shopify/polaris';
import {ArrowDownMinor} from '@shopify/polaris-icons';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      breadcrumbs={[{content: 'Products', url: '#'}]}
      title="Invoice"
      subtitle="Statement period: May 3, 2019 to June 2, 2019"
      secondaryActions={[{content: 'Download', icon: ArrowDownMinor}]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export default withPolarisExample(PageExample);
