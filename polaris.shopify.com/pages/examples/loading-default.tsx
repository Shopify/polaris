import {Frame, Loading} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LoadingExample() {
  return (
    <div style={{height: '100px'}}>
      <Frame>
        <Loading />
      </Frame>
    </div>
  );
}

export default withPolarisExample(LoadingExample);
