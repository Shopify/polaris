import React from 'react';
import isEqual from 'lodash/isEqual';
import {setColors} from './utils';
import {Theme} from './types';
import ThemeProviderContext from './context';

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
  }

  render() {
    const {
      theme: {logo = null, ...rest},
    } = this.state;
    const {children} = this.props;
    const styles = this.createStyles() || defaultTheme;

    const context = {
      ...rest,
      logo,
    };

    return (
      <ThemeProviderContext.Provider value={context}>
        <div style={styles}>{React.Children.only(children)}</div>
      </ThemeProviderContext.Provider>
    );
  }

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
