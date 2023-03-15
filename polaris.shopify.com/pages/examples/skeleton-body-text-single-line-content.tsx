import {SkeletonBodyText} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SkeletonExample() {
  return <SkeletonBodyText lines={1} />;
}

export default withPolarisExample(SkeletonExample);
