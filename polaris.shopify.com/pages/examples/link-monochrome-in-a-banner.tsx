import {Banner, Link} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LinkExample() {
  return (
    <Banner>
      Learn more about{' '}
      <Link url="https://help.shopify.com/manual">fulfilling orders</Link>
    </Banner>
  );
}

export default withPolarisExample(LinkExample);
