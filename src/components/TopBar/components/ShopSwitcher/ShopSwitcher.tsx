import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import Icon from '../../../Icon';
import TextStyle from '../../../TextStyle';
import Image from '../../../Image';
import Popover from '../../../Popover';
import Switcher, {BaseProps as SwitcherProps} from '../../../ShopSwitcher';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import {getWidth} from '../../../../utilities/getWidth';
import * as styles from './ShopSwitcher.scss';

type Props = SwitcherProps;
type ComposedProps = Props & WithAppProviderProps;

interface State {
  open: boolean;
}

class ShopSwitcher extends React.Component<ComposedProps, State> {
  state = {
    open: false,
  };

  render() {
    const {open} = this.state;
    const {
      shops,
      searchPlaceholder,
      activeIndex,
      noResultsLabel,
      polaris: {
        theme: {logo},
      },
    } = this.props;

    const {name} = this.activeShop;
    const logoMarkup = logo && (
      <Image
        source={logo.topBarSource || ''}
        alt={logo.accessibilityLabel || ''}
        className={styles.Logo}
        style={{width: getWidth(logo, 25)}}
      />
    );

    const activator = (
      <div className={styles.ActivatorWrapper}>
        <button
          type="button"
          className={styles.Activator}
          onClick={this.togglePopover}
        >
          {logoMarkup}
          <span className={styles.ShopName}>
            <TextStyle variation="strong">{name}</TextStyle>
          </span>
          <span className={styles.Icon}>
            <Icon source="chevronDown" color="white" />
          </span>
        </button>
      </div>
    );

    return (
      <Switcher
        shops={shops}
        searchPlaceholder={searchPlaceholder}
        activeIndex={activeIndex}
        noResultsLabel={noResultsLabel}
      >
        {(searchField, shopsList) => (
          <Popover
            fullHeight
            active={open}
            activator={activator}
            onClose={this.togglePopover}
            preferredAlignment="left"
            header={searchField}
          >
            {shopsList}
          </Popover>
        )}
      </Switcher>
    );
  }

  @autobind
  private togglePopover() {
    const {open} = this.state;
    this.setState({open: !open});
  }

  private get activeShop() {
    const {shops, activeIndex} = this.props;
    return shops[activeIndex];
  }
}

export default withAppProvider<Props>()(ShopSwitcher);
