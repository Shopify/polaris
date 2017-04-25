import * as React from 'react';
import * as PropTypes from 'prop-types';
import EASDK, {Options} from '../easdk';
import {name, version} from '../../../package.json';

import './App.scss';

export type Props = Options;

const METADATA = {
  [name]: version,
};

export default class App extends React.Component<Props, never> {
  static childContextTypes = {easdk: PropTypes.instanceOf(EASDK)};

  private easdk = new EASDK({
    apiKey: this.props.apiKey,
    shopOrigin: this.props.shopOrigin,
    forceRedirect: this.props.forceRedirect,
    debug: this.props.debug,
  }, METADATA);

  getChildContext() {
    return {easdk: this.easdk};
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
