import {Button} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return <Button outline>Add product</Button>;
}

export default withPolarisExample(ButtonExample);
