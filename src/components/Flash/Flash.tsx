import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {FrameContext, frameContextTypes, FlashDescriptor} from '../types';

const createId = createUniqueIDFactory('Flash');

export type Props = FlashDescriptor;

export default class Flash extends React.PureComponent<Props, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;

  private id = createId();

  componentDidMount() {
    this.context.frame.showFlash({id: this.id, ...this.props});
  }

  componentWillUnmount() {
    this.context.frame.hideFlash({id: this.id});
  }

  render() {
    return null;
  }
}
