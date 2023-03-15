import {Tag} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TagExample() {
  return <Tag onClick={() => console.log('Clicked')}>Wholesale</Tag>;
}

export default withPolarisExample(TagExample);
