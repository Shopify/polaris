import * as React from 'react';
import Image from '../../../Image';
import Scrollable from '../../../Scrollable';
import Menu from '../Menu';
import Switcher, {BaseProps as SwitcherProps} from '../../../ShopSwitcher';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import * as styles from './ShopSwitcher.scss';

export type Props = SwitcherProps & {
  activatorAccessibilityLabel?: string;
};
type ComposedProps = Props & WithAppProviderProps;

function ShopSwitcher({
  shops,
  searchPlaceholder,
  activeIndex,
  noResultsMessage,
  activatorAccessibilityLabel,
  polaris: {
    theme: {logo},
  },
}: ComposedProps) {
  const {name: shopName} = shops[activeIndex];

  const logoMarkup = logo && (
    <Image
      source={logo.shopSwitcherSource || ''}
      alt={logo.accessibilityLabel || ''}
      className={styles.Logo}
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
        noResultsMessage={noResultsMessage}
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
