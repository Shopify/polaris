import {FooterHelp, Link} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function FooterHelpExample() {
  return (
    <FooterHelp>
      Learn more about{' '}
      <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
        fulfilling orders
      </Link>
    </FooterHelp>
  );
}

export default withPolarisExample(FooterHelpExample);
