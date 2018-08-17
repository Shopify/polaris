import * as React from 'react';
import {FrameContext, frameContextTypes} from '../types';
import {withAppProvider, WithAppProviderProps} from '..';

export interface Props {}
export type ComposedProps = Props & WithAppProviderProps;

export class Loading extends React.PureComponent<ComposedProps, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;

  componentDidMount() {
    const {easdk} = this.props.polaris;

    if (easdk == null) {
      this.context.frame.startLoading();
    } else {
      easdk.startLoading();
    }
  }

  componentWillUnmount() {
    const {easdk} = this.props.polaris;

    if (easdk == null) {
      this.context.frame.stopLoading();
    } else {
      easdk.stopLoading();
    }
  }

  render() {
    return null;
  }
}

export default withAppProvider<Props>()(Loading);
