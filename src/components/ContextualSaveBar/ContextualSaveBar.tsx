import * as React from 'react';
import compose from '@shopify/react-compose';
import isEqual from 'lodash/isEqual';
import {ContextualSaveBarProps, FrameContext, Consumer} from '../Frame';
import withContext from '../WithContext';
import {WithContextTypes} from '../../types';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `ContextualSaveBar extends React.Component<ContextualSaveBarProps>`
interface Props extends ContextualSaveBarProps {}
export type ComposedProps = Props &
  WithAppProviderProps &
  WithContextTypes<FrameContext>;

class ContextualSaveBar extends React.PureComponent<ComposedProps, never> {
  componentDidMount() {
    const {
      props: {polaris, context, ...rest},
    } = this;
    context.frame.setContextualSaveBar(rest);
  }

  componentWillUnmount() {
    this.props.context.frame.removeContextualSaveBar();
  }

  componentDidUpdate(oldProps: ComposedProps) {
    const {
      props: {polaris, context, ...rest},
    } = this;
    if (contextualSaveBarHasChanged(rest, oldProps)) {
      context.frame.setContextualSaveBar(rest);
    }
  }

  render() {
    return null;
  }
}

function contextualSaveBarHasChanged(
  {message, saveAction, discardAction}: Props,
  {
    message: oldMessage,
    saveAction: oldsaveAction,
    discardAction: oldDiscardAction,
  }: Props,
) {
  return Boolean(
    message !== oldMessage ||
      !isEqual(saveAction, oldsaveAction) ||
      !isEqual(discardAction, oldDiscardAction),
  );
}

export default compose<Props>(
  withContext<Props, WithAppProviderProps, FrameContext>(Consumer),
  withAppProvider(),
)(ContextualSaveBar);
