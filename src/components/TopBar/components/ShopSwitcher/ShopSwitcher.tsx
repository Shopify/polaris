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
    open: false,
  };

  render() {
    const {open} = this.state;
    const {
      shops,
      searchPlaceholder,
      polaris: {
        theme: {logo},
      },
    } = this.props;

    const logoMarkup = logo && (
      <Image
        source={logo.topBarSource || ''}
        alt={logo.accessibilityLabel || ''}
        className={styles.Logo}
        style={{width: getWidth(logo, 104)}}
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
          <TextStyle variation="strong">Little Victories CA</TextStyle>
        </div>
        <Icon source="chevronDown" color="white" />
      </button>
    );

    return (
      <Popover active={open} activator={activator} onClose={this.togglePopover}>
        <Switcher shops={shops} searchPlaceholder={searchPlaceholder} />
      </Popover>
    );
  }

  @autobind
  private togglePopover() {
    const {open} = this.state;
    this.setState({open: !open});
  }
}

export default withAppProvider<Props>()(ShopSwitcher);
