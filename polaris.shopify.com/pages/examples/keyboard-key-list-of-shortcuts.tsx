import {KeyboardKey} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function Example() {
  return <KeyboardKey>Ctrl</KeyboardKey>;
}

export default withPolarisExample(Example);
