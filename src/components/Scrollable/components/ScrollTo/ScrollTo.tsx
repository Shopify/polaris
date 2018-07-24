import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {contextTypes} from '../../types';

export default class ScrollTo extends React.Component<{}, never> {
  static contextTypes = contextTypes;
  private ref: React.RefObject<HTMLAnchorElement> = React.createRef();

  componentDidMount() {
    const {scrollToPosition} = this.context;

    if (!scrollToPosition || !this.ref.current) {
      return;
    }
    window.requestAnimationFrame(() => {
      if (!scrollToPosition || !this.ref.current) {
        return;
      }
      scrollToPosition(this.ref.current.offsetTop);
    });
  }

  render() {
    const getUniqueId = createUniqueIDFactory(`ScrollTo`);
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    return <a id={getUniqueId()} ref={this.ref} />;
  }
}
