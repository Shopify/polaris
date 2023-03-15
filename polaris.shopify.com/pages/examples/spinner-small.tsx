import {Spinner} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SpinnerExample() {
  return <Spinner accessibilityLabel="Small spinner example" size="small" />;
}

export default withPolarisExample(SpinnerExample);
