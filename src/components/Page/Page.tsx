import * as React from 'react';
import * as PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import {classNames} from '@shopify/react-utilities/styles';

import Header, {Props as HeaderProps} from './Header';
import * as styles from './Page.scss';

export interface Props extends HeaderProps {
  children?: React.ReactNode,
  fullWidth?: boolean,
}

const EASDK_PROPS: (keyof Props)[] = [
  'title',
  'icon',
  'breadcrumbs',
  'secondaryActions',
  'primaryAction',
  'pagination',
];

export default class Page extends React.PureComponent<Props, never> {
  static contextTypes = {easdk: PropTypes.object};

  componentDidMount() {
    if (this.context.easdk == null) { return; }
    this.handleEASDKMessaging();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.context.easdk == null) { return; }

    const prevEASDKProps = pick<{}, Props>(prevProps, EASDK_PROPS);
    const currentEASDKProps = pick<{}, Props>(this.props, EASDK_PROPS);

    if (!isEqual(prevEASDKProps, currentEASDKProps)) {
      this.handleEASDKMessaging();
    }
  }

  render() {
    const {
      children,
      fullWidth,
      ...rest,
    } = this.props;

    const className = classNames(
      styles.Page,
      fullWidth && styles.fullWidth,
    );

    const headerMarkup = this.context.easdk
      ? null
      : <Header {...rest} />;

    return (
      <div className={className}>
        {headerMarkup}
        <div className={styles.Content}>
          {children}
        </div>
      </div>
    );
  }

  private handleEASDKMessaging() {
    const {easdk} = this.context;

    if (easdk) {
      easdk.Bar.update(this.props);
    }
  }
}
