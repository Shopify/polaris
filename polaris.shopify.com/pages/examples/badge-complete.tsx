import {Badge} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return <Badge progress="complete">Fulfilled</Badge>;
}

export default withPolarisExample(BadgeExample);
