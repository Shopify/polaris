import {Button} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return (
    <Button plain destructive>
      Remove
    </Button>
  );
}

export default withPolarisExample(ButtonExample);
