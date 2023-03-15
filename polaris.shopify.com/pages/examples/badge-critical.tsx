import {Badge} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return <Badge status="critical">Action required</Badge>;
}

export default withPolarisExample(BadgeExample);
