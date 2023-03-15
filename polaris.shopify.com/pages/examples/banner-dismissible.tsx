import {Banner, Link} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BannerExample() {
  return (
    <Banner onDismiss={() => {}}>
      <p>
        Use your finance report to get detailed information about your business.{' '}
        <Link url="">Let us know what you think</Link>
      </p>
    </Banner>
  );
}

export default withPolarisExample(BannerExample);
