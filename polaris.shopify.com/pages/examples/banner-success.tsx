import {Banner} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BannerExample() {
  return (
    <Banner
      title="Your shipping label is ready to print."
      status="success"
      action={{content: 'Print label'}}
      onDismiss={() => {}}
    />
  );
}

export default withPolarisExample(BannerExample);
