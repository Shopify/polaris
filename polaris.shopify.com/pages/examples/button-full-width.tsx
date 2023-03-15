import {Button} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return <Button fullWidth>Add customer</Button>;
}

export default withPolarisExample(ButtonExample);
