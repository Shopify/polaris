import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {setColors} from './utils';
import {Theme, ThemeContext, THEME_CONTENT_TYPES} from './types';

export interface Props {
  /** Custom logos and colors provided to select components */
  theme: Theme;
}

export interface Context {
  theme?: ThemeContext;
}

export default class ThemeProvider extends React.Component<Props> {
  static childContextTypes = THEME_CONTENT_TYPES;
  public polarisContext: Context;
  private subscriptions: {(): void}[] = [];

  constructor(props: Props) {
    super(props);

    this.polarisContext = setPolarisContext(
      this.props.theme,
      this.subscribe,
      this.unsubscribe,
    );
  }

  componentDidMount() {
    setColors(this.props.theme);
  }

  componentWillReceiveProps({theme}: Props) {
    if (theme !== this.props.theme) {
      this.polarisContext = setPolarisContext(
        this.props.theme,
        this.subscribe,
        this.unsubscribe,
      );
    }

    if (isEqual(theme, this.props.theme)) {
      return;
    }

    this.subscriptions.forEach((subscriberCallback) => subscriberCallback());
    setColors(theme);
  }

  getChildContext() {
    return this.polarisContext;
  }

  render() {
    return React.Children.only(this.props.children);
  }

  @autobind
  subscribe(callback: () => void) {
    this.subscriptions.push(callback);
  }

  @autobind
  unsubscribe(callback: () => void) {
    this.subscriptions = this.subscriptions.filter(
      (subscription) => subscription !== callback,
    );
  }
}

function setPolarisContext(
  ctx: Theme,
  subscribe: (callback: () => void) => void,
  unsubscribe: (callback: () => void) => void,
): Context {
  const {colors, logo = null, ...rest} = ctx;
  return {theme: {logo, subscribe, unsubscribe, ...rest}};
}
