import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createThemeStyles} from './utils';
import {Theme, ThemeContext, THEME_CONTEXT_TYPES} from './types';

export interface Props {
  /** Custom logos and colors provided to select components */
  theme: Theme;
  /** The content to display */
  children?: React.ReactNode;
}

export interface Context {
  polarisTheme?: ThemeContext;
}

export default class ThemeProvider extends React.Component<Props> {
  static childContextTypes = THEME_CONTEXT_TYPES;
  public themeContext: Context;
  private subscriptions: {(): void}[] = [];
  private themeStyles = this.props.theme.styles
    ? createThemeStyles(this.props.theme.styles)
    : {};

  constructor(props: Props) {
    super(props);

    this.themeContext = setThemeContext(
      this.props.theme,
      this.subscribe,
      this.unsubscribe,
    );
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps({theme}: Props) {
    if (isEqual(theme, this.props.theme)) {
      return;
    }

    this.themeContext = setThemeContext(
      theme,
      this.subscribe,
      this.unsubscribe,
    );

    this.subscriptions.forEach((subscriberCallback) => subscriberCallback());
    this.themeStyles = theme.styles ? createThemeStyles(theme.styles) : {};
  }

  getChildContext() {
    return this.themeContext;
  }

  render() {
    return (
      <div style={this.themeStyles}>
        {React.Children.only(this.props.children)}
      </div>
    );
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

function setThemeContext(
  ctx: Theme,
  subscribe: (callback: () => void) => void,
  unsubscribe: (callback: () => void) => void,
): Context {
  const {styles, logo = null, ...rest} = ctx;
  return {polarisTheme: {logo, subscribe, unsubscribe, ...rest}};
}
