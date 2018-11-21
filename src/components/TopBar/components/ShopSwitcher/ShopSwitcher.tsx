import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import Icon from '../../../Icon';
import TextStyle from '../../../TextStyle';
import Image from '../../../Image';
import Popover from '../../../Popover';
import Switcher, {Props as SwitcherProps} from '../../../ShopSwitcher';
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
    open: true,
  };

  render() {
    const {open} = this.state;
    const {
      shops,
      searchPlaceholder,
      activeIndex,
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
        style={{width: getWidth(logo, 28)}}
      />
    );

    const activator = (
      <button
        type="button"
        className={styles.Activator}
        onClick={this.togglePopover}
      >
        {logoMarkup}
        <div className={styles.ShopName}>
          <TextStyle variation="strong">{name}</TextStyle>
        </div>
        <Icon source="chevronDown" color="white" />
      </button>
    );

    return (
      <Switcher
        shops={shops}
        searchPlaceholder={searchPlaceholder}
        activeIndex={activeIndex}
      >
        {(searchField, shopsList) => (
          <Popover
            active={open}
            activator={activator}
            onClose={this.togglePopover}
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
