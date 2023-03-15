import {ProgressBar} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ProgressBarExample() {
  return (
    <div style={{width: 225}}>
      <ProgressBar progress={40} size="small" />
    </div>
  );
}

export default withPolarisExample(ProgressBarExample);
