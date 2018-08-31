import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import {FrameContext, frameContextTypes} from '../types';
import {withAppProvider, WithAppProviderProps} from '..';

const createId = createUniqueIDFactory('Toast');

export interface Props {
  /** The content that should appear in the toast message */
  content: string;
  /** The length of time in milliseconds the toast message should persist (defaults to 5000) */
  duration?: number;
  /** Render Toast as an error. Use only in rare cases where following the Polaris Error messages guidelines is not possible https://polaris.shopify.com/patterns/error-messages */
  error?: boolean;
  /** Callback when the dismiss icon is clicked */
  onDismiss(): void;
}

export type ComposedProps = Props & WithAppProviderProps;

export class Toast extends React.PureComponent<ComposedProps, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;

  private id = createId();

  componentDidMount() {
    const {context, id} = this;
    const {children, ...rest} = this.props;
    const {easdk} = this.props.polaris;

    if (easdk == null) {
      context.frame.showToast({
        id,
        ...(rest as Props),
      });
    } else {
      easdk.showFlashNotice(this.props.content);
    }
  }

  componentWillUnmount() {
    this.context.frame.hideToast({id: this.id});
  }

  render() {
    return null;
  }
}

export default withAppProvider<Props>()(Toast);
