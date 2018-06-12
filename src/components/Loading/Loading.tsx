import * as React from 'react';
import {FrameContext, frameContextTypes} from '../types';

export interface Props {}

export default class Loading extends React.PureComponent<Props, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;

  componentDidMount() {
    this.context.frame.startLoading();
  }

  componentWillUnmount() {
    this.context.frame.stopLoading();
  }

  render() {
    return null;
  }
}
