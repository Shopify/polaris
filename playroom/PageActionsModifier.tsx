import * as React from 'react';
// eslint-disable-next-line shopify/strict-component-boundaries
import withContext from '../src/components/withContext';
import {WithContextTypes} from '../src/types';
import {PageActionsContext, PageActionsContextType} from './Page';

interface Props {
  dirty: boolean;
  loading: boolean;
  onClick(): void;
}

type ComposedProps = Props & WithContextTypes<PageActionsContextType>;

class PageActionsModifier extends React.Component<ComposedProps, {}> {
  static getDerivedStateFromProps({
    context: {setPageActionsState},
    dirty,
    loading,
    onClick,
  }: ComposedProps) {
    if (setPageActionsState) {
      setPageActionsState({dirty, loading, onClick});
    }
    return null;
  }

  state = {};

  render() {
    return null;
  }
}

export default withContext<Props, {}, PageActionsContextType>(
  PageActionsContext.Consumer,
)(PageActionsModifier);
