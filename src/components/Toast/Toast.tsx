import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {FrameContext, frameContextTypes, ToastDescriptor} from '../types';

const createId = createUniqueIDFactory('Toast');

export type Props = ToastDescriptor;

export default class Toast extends React.PureComponent<Props, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;

  private id = createId();

  componentDidMount() {
    this.context.frame.showToast({id: this.id, ...this.props});
  }

  componentWillUnmount() {
    this.context.frame.hideToast({id: this.id});
  }

  render() {
    return null;
  }
}
