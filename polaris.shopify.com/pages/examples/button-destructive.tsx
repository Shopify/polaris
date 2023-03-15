import {Button} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return <Button destructive>Delete theme</Button>;
}

export default withPolarisExample(ButtonExample);
