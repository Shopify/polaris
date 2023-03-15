import {PageActions, Button} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <PageActions
      primaryAction={
        <Button
          primary
          connectedDisclosure={{
            accessibilityLabel: 'Other save actions',
            actions: [{content: 'Save as draft'}],
          }}
        >
          Save
        </Button>
      }
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
        },
      ]}
    />
  );
}

export default withPolarisExample(PageExample);
