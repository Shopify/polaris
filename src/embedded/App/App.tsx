import * as React from 'react';
import EASDK, {Options} from '../easdk';
import {name, version} from '../../../package.json';

import './App.scss';

export type Props = Options;

export default class App extends React.Component<Props, never> {
  static childContextTypes = {
    easdk: React.PropTypes.instanceOf(EASDK),
  };

  private easdk: EASDK;

  constructor(props: Props) {
    super();

    const {
      apiKey,
      shopOrigin,
      forceRedirect,
      debug,
    } = props;

    const metadata = {
      [name]: version,
    };

    this.easdk = new EASDK({apiKey, shopOrigin, forceRedirect, metadata, debug});
  }

  getChildContext() {
    return {easdk: this.easdk};
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
