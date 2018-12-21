import * as React from 'react';
import {isServer} from '@shopify/react-utilities/target';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import Image from '../Image';

import * as styles from './Avatar.scss';
import * as avatars from './images';

export type Size = 'small' | 'medium' | 'large';

const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five', 'six'];
const AVATAR_IMAGES = Object.keys(avatars).map(
  // import/namespace does not allow computed values by default
  // eslint-disable-next-line import/namespace
  (key: keyof typeof avatars) => avatars[key],
);

export interface Props {
  /**
   * Size of avatar
   * @default 'medium'
   */
  size?: Size;
  /** The name of the person */
  name?: string;
  /** Initials of person to display */
  initials?: string;
  /** Whether the avatar is for a customer */
  customer?: boolean;
  /** URL of the avatar image which falls back to initials if the image fails to load */
  source?: string;
  /** Accessible label for the avatar image */
  accessibilityLabel?: string;
}

export interface State {
  hasError: boolean;
  hasLoaded: boolean;
  prevSource?: string;
}

export type CombinedProps = Props & WithAppProviderProps;

export class Avatar extends React.PureComponent<CombinedProps, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.source !== state.prevSource) {
      return {
        prevSource: props.source,
        hasError: false,
        hasLoaded: false,
      };
    }

    return null;
  }

  state: State = {
    hasError: false,
    hasLoaded: false,
  };

  render() {
    const {
      name,
      source,
      initials,
      customer,
      size = 'medium',
      accessibilityLabel,
      polaris: {intl},
    } = this.props;

    const {hasError, hasLoaded} = this.state;

    const hasImage = (source || customer) && !hasError;

    const nameString = name || initials;

    let finalSource: string | undefined;
    let label: string | undefined;

    if (accessibilityLabel) {
      label = accessibilityLabel;
    } else if (name) {
      label = name;
    } else if (initials) {
      const splitInitials = initials.split('').join(' ');
      label = intl.translate('Polaris.Avatar.labelWithInitials', {
        initials: splitInitials,
      });
    } else {
      label = intl.translate('Polaris.Avatar.label');
    }

    if (source) {
      finalSource = source;
    } else if (customer) {
      finalSource = customerPlaceholder(nameString);
    }

    const className = classNames(
      styles.Avatar,
      styles[variationName('style', styleClass(nameString))],
      size && styles[variationName('size', size)],
      hasImage && !hasLoaded && styles.hidden,
      hasImage && styles.hasImage,
    );

    const imageMarkUp =
      finalSource && !isServer && !hasError ? (
        <Image
          className={styles.Image}
          source={finalSource}
          alt=""
          role="presentation"
          onLoad={this.handleLoad}
          onError={this.handleError}
        />
      ) : null;

    // Use `dominant-baseline: central` instead of `dy` when Edge supports it.
    const verticalOffset = '0.35em';

    const initialsMarkup =
      initials && !hasImage ? (
        <span className={styles.Initials}>
          <svg className={styles.Svg} viewBox="0 0 48 48">
            <text
              x="50%"
              y="50%"
              dy={verticalOffset}
              fill="currentColor"
              fontSize="26"
              textAnchor="middle"
            >
              {initials}
            </text>
          </svg>
        </span>
      ) : null;

    return (
      <span aria-label={label} role="img" className={className}>
        {initialsMarkup}
        {imageMarkUp}
      </span>
    );
  }

  @autobind
  handleError() {
    this.setState({hasError: true, hasLoaded: false});
  }

  @autobind
  handleLoad() {
    this.setState({hasLoaded: true, hasError: false});
  }
}

function styleClass(name?: string) {
  return name
    ? STYLE_CLASSES[name.charCodeAt(0) % STYLE_CLASSES.length]
    : STYLE_CLASSES[0];
}

function customerPlaceholder(name?: string) {
  return name
    ? AVATAR_IMAGES[name.charCodeAt(0) % AVATAR_IMAGES.length]
    : AVATAR_IMAGES[0];
}

export default withAppProvider()(Avatar);
