import * as React from 'react';
import {findDOMNode} from 'react-dom';
import isEqual from 'lodash/isEqual';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {setColors} from './utils';
import {Theme, ThemeContext, THEME_CONTENT_TYPES} from './types';

export interface Props {
  /** Custom logos and colors provided to select components */
  theme: Theme;
  useRoot?: boolean;
}

export interface Context {
  theme?: ThemeContext;
}

export default class ThemeProvider extends React.Component<Props> {
  static childContextTypes = THEME_CONTENT_TYPES;
  public themeContext: Context;
  private childNode: Element | null;
  private subscriptions: {(): void}[] = [];

  constructor(props: Props) {
    super(props);

    this.themeContext = setThemeContext(
      this.props.theme,
      this.subscribe,
      this.unsubscribe,
    );
  }

  componentDidMount() {
    const {useRoot, theme} = this.props;
    this.childNode = useRoot ? null : setChildNode(this);
    setColors(theme, this.childNode);
  }

  componentWillReceiveProps({theme}: Props) {
    if (theme !== this.props.theme) {
      this.themeContext = setThemeContext(
        this.props.theme,
        this.subscribe,
        this.unsubscribe,
      );
    }

    if (isEqual(theme, this.props.theme)) {
      return;
    }

    this.subscriptions.forEach((subscriberCallback) => subscriberCallback());
    setColors(theme, this.childNode);
  }

  getChildContext() {
    return this.themeContext;
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

function setThemeContext(
  ctx: Theme,
  subscribe: (callback: () => void) => void,
  unsubscribe: (callback: () => void) => void,
): Context {
  const {colors, logo = null, ...rest} = ctx;
  return {theme: {logo, subscribe, unsubscribe, ...rest}};
}

function setChildNode(instance: any) {
  let childNode = findDOMNode(instance);
  if (childNode instanceof Text) {
    childNode = null;
  }

  return childNode;
}
