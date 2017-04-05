import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {layeredComponent} from '@shopify/react-utilities/components';

import {PreferredPosition, Alignment} from '../PositionedOverlay';
import PopoverOverlay from './PopoverOverlay';
import Pane from './Pane';
import Section from './Section';

export interface Props {
  alignment?: Alignment,
  fullHeight?: boolean,
  preferredPosition?: PreferredPosition,
  active: boolean,
  activator: React.ReactElement<{}>,
  children?: React.ReactNode,
  onCloseRequest(): void,
}

@layeredComponent({idPrefix: 'Popover'})
export default class Popover extends React.PureComponent<Props, {}> {
  static Pane = Pane;

  static Section = Section;

  constructor(props: Props) {
    super(props);
  }

  get activatorNode(): HTMLElement {
    return findDOMNode<HTMLElement>(this);
  }

  renderLayer() {
    const {
      children,
      fullHeight,
      alignment,
      preferredPosition,
      active,
      onCloseRequest,
    } = this.props;

    return (
      <PopoverOverlay
        preferredPosition={preferredPosition}
        fullHeight={fullHeight}
        alignment={alignment}
        activator={this.activatorNode}
        active={active}
        onCloseRequest={onCloseRequest}
      >
        {children}
      </PopoverOverlay>
    );
  }

  render() {
    return React.Children.only(this.props.activator);
  }
}
