import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import withContext from '../../../WithContext';
import ScrollableContext, {ScrollableContextType} from '../../context';
import {WithContextTypes} from '../../../../types';

type ComposedProps = WithContextTypes<ScrollableContextType>;

class ScrollTo extends React.Component<ComposedProps, never> {
  private ref: React.RefObject<HTMLAnchorElement> = React.createRef();

  componentDidMount() {
    const {scrollToPosition} = this.props.context;

    if (!scrollToPosition || !this.ref.current) {
      return;
    }

    scrollToPosition(this.ref.current.offsetTop);
  }

  render() {
    const getUniqueId = createUniqueIDFactory(`ScrollTo`);
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    return <a id={getUniqueId()} ref={this.ref} />;
  }
}

export default withContext<{}, {}, ScrollableContextType>(
  ScrollableContext.Consumer,
)(ScrollTo);
