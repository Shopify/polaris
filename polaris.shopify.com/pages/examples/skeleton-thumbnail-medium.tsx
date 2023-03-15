import {SkeletonThumbnail} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SkeletonExample() {
  return <SkeletonThumbnail size="medium" />;
}

export default withPolarisExample(SkeletonExample);
