import * as React from 'react';
import Image from '../../../Image';
import Scrollable from '../../../Scrollable';
import Menu from '../Menu';
import Switcher, {BaseProps as SwitcherProps} from '../../../ShopSwitcher';
import {getWidth} from '../../../../utilities/getWidth';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';

export type Props = SwitcherProps & {
  activatorAccessibilityLabel: string;
};
type ComposedProps = Props & WithAppProviderProps;

function ShopSwitcher({
  shops,
  searchPlaceholder,
  activeIndex,
  noResultsLabel,
  activatorAccessibilityLabel,
  polaris: {
    theme: {logo},
  },
}: ComposedProps) {
  const {name: shopName} = shops[activeIndex];

  const logoMarkup = logo && (
    <Image
      source={logo.topBarSource || ''}
      alt={logo.accessibilityLabel || ''}
      style={{width: getWidth(logo, 26)}}
    />
  );

  return (
    <Menu
      title={shopName}
      avatar={logoMarkup}
      activatorAccessibilityLabel={activatorAccessibilityLabel}
    >
      <Switcher
        shops={shops}
        searchPlaceholder={searchPlaceholder}
        activeIndex={activeIndex}
        noResultsLabel={noResultsLabel}
      >
        {(searchField, shopsList) => (
          <React.Fragment>
            {searchField}
            <Scrollable vertical shadow>
              {shopsList}
            </Scrollable>
          </React.Fragment>
        )}
      </Switcher>
    </Menu>
  );
}

export default withAppProvider<Props>()(ShopSwitcher);
