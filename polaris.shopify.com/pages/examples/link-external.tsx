import {Link} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LinkExample() {
  return (
    <Link url="https://help.shopify.com/manual" external>
      Shopify Help Center
    </Link>
  );
}

export default withPolarisExample(LinkExample);
