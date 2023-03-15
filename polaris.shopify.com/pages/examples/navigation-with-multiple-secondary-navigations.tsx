import {Frame, Navigation} from '@shopify/polaris';
import {
  HomeMinor,
  OrdersMinor,
  MarketingMinor,
  ProductsMinor,
} from '@shopify/polaris-icons';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function NavigationExample() {
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Home',
              icon: HomeMinor,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMinor,
              badge: '15',
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Collections',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Inventory',
                },
              ],
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Marketing',
              icon: MarketingMinor,
              badge: '15',
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Reports',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Live view',
                },
              ],
            },
            {
              url: '#',
              label: 'Products',
              icon: ProductsMinor,
              selected: true,
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Collections',
                },
                {
                  url: '#',
                  disabled: false,
                  label: 'Inventory',
                },
              ],
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
