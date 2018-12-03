import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {setColors} from './utils';
import {Theme, ThemeProviderContext, THEME_CONTEXT_TYPES} from './types';

export interface Props {
  /** Custom logos and colors provided to select components */
  theme: Theme;
  /** The content to display */
  children?: React.ReactNode;
}

const defaultTheme = {
  '--top-bar-background': '#00848e',
  '--top-bar-color': '#f9fafb',
  '--top-bar-background-darker': '#006d74',
  '--top-bar-background-lighter': '#1d9ba4',
};

export default class ThemeProvider extends React.Component<Props> {
  static childContextTypes = THEME_CONTEXT_TYPES;
  public themeContext: ThemeProviderContext;
  private subscriptions: {(): void}[] = [];
  private colors: string[][] | undefined;

  constructor(props: Props) {
    super(props);

    this.themeContext = setThemeContext(
      this.props.theme,
      this.subscribe,
      this.unsubscribe,
    );

    this.colors = setColors(props.theme);
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
    this.colors = setColors(theme);
  }

  getChildContext() {
    return this.themeContext;
  }

  render() {
    const styles = this.createStyles() || defaultTheme;

    return <div style={styles}>{React.Children.only(this.props.children)}</div>;
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

  createStyles() {
    return this.colors
      ? this.colors.reduce(
          (state, [key, value]) => ({...state, [key]: value}),
          {},
        )
      : null;
  }
}

function setThemeContext(
  ctx: Theme,
  subscribe: (callback: () => void) => void,
  unsubscribe: (callback: () => void) => void,
): ThemeProviderContext {
  const {colors, logo = null, ...rest} = ctx;
  return {polarisTheme: {logo, subscribe, unsubscribe, ...rest}};
}
