import {SkeletonDisplayText} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SkeletonExample() {
  return <SkeletonDisplayText size="extraLarge" />;
}

export default withPolarisExample(SkeletonExample);
