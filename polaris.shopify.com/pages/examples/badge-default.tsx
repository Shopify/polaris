import {Badge} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return <Badge>Fulfilled</Badge>;
}

export default withPolarisExample(BadgeExample);
