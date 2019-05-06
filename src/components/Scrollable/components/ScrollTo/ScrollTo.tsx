import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import withContext from '../../../WithContext';
import {Consumer} from '../Context';
import {ScrollableContext} from '../../types';
import {WithContextTypes} from '../../../../types';

type ComposedProps = WithContextTypes<ScrollableContext>;

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

export default withContext<{}, {}, ScrollableContext>(Consumer)(ScrollTo);
