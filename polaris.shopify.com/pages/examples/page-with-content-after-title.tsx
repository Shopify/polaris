import {Page, Badge, LegacyCard} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      breadcrumbs={[{content: 'Products', url: '#'}]}
      title="Jar With Lock-Lid"
      titleMetadata={<Badge status="attention">Verified</Badge>}
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {content: 'Duplicate'},
        {content: 'View on your store'},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export default withPolarisExample(PageExample);
