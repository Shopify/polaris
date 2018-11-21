import * as React from 'react';
import Image from '../../../Image';
import Menu from '../Menu';
import Switcher, {Props as SwitcherProps} from '../../../ShopSwitcher';
import {getWidth} from '../../../../utilities/getWidth';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';

export type Props = SwitcherProps;
type ComposedProps = Props & WithAppProviderProps;

function ShopSwitcher({
  shops,
  searchPlaceholder,
  activeIndex,
  polaris: {
    theme: {logo},
  },
}: ComposedProps) {
  const {name: shopName} = shops[activeIndex];

  const logoMarkup = logo && (
    <Image
      source={logo.topBarSource || ''}
      alt={logo.accessibilityLabel || ''}
      style={{width: getWidth(logo, 28)}}
    />
  );

  return (
    <Menu
      title={shopName}
      avatar={logoMarkup}
      accessibilityLabel="Show shop switcher"
    >
      <Switcher
        shops={shops}
        searchPlaceholder={searchPlaceholder}
        activeIndex={activeIndex}
      >
        {(searchField, shopsList) => (
          <div>
            {searchField}
            {shopsList}
          </div>
        )}
      </Switcher>
    </Menu>
  );
}

export default withAppProvider<Props>()(ShopSwitcher);
