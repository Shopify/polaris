import {PageActions, Button} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={
        <Button
          connectedDisclosure={{
            accessibilityLabel: 'Other save actions',
            actions: [{content: 'Save as draft'}],
          }}
        >
          Save
        </Button>
      }
    />
  );
}

export default withPolarisExample(PageExample);
