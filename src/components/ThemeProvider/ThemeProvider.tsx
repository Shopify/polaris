import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {setColors} from './utils';
import {Theme, ThemeProviderContext, THEME_CONTEXT_TYPES} from './types';

export interface State {
  theme: Theme;
  colors: string[][] | undefined;
}

export interface Props {
  /** Custom logos and colors provided to select components */
  theme: Theme;
  /** The content to display */
  children?: React.ReactNode;
}

const defaultTheme = {
  '--top-bar-background': '#00848e',
  '--top-bar-color': '#f9fafb',
  '--top-bar-background-lighter': '#1d9ba4',
};

export default class ThemeProvider extends React.Component<Props, State> {
  static childContextTypes = THEME_CONTEXT_TYPES;
  private subscriptions: {(): void}[] = [];

  constructor(props: Props) {
    super(props);

    const {theme} = this.props;
    this.state = {
      theme: setThemeContext(theme),
      colors: setColors(theme),
    };
  }

  componentDidUpdate({theme: prevTheme}: Props) {
    const {theme} = this.props;
    if (isEqual(prevTheme, theme)) {
      return;
    }

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      theme: setThemeContext(theme),
      colors: setColors(theme),
    });

    this.subscriptions.forEach((subscriberCallback) => subscriberCallback());
  }

  getChildContext(): ThemeProviderContext {
    const {
      theme: {logo = null, ...rest},
    } = this.state;

    return {
      polarisTheme: {
        ...rest,
        logo,
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
      },
    };
  }

  render() {
    const styles = this.createStyles() || defaultTheme;

    return <div style={styles}>{React.Children.only(this.props.children)}</div>;
  }

  subscribe = (callback: () => void) => {
    this.subscriptions.push(callback);
  };

  unsubscribe = (callback: () => void) => {
    this.subscriptions = this.subscriptions.filter(
      (subscription) => subscription !== callback,
    );
  };

  createStyles() {
    const {colors} = this.state;
    return colors
      ? colors.reduce((state, [key, value]) => ({...state, [key]: value}), {})
      : null;
  }
}

function setThemeContext(ctx: Theme): Theme {
  const {colors, ...theme} = ctx;
  return {...theme};
}
