import {Badge} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return <Badge status="warning">On hold</Badge>;
}

export default withPolarisExample(BadgeExample);
