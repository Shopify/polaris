import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';
import * as styles from './Search.scss';

export interface Props {
  visible?: boolean;
  children?: React.ReactNode;
  onDismiss?(): void;
}

export default class Search extends React.PureComponent<Props, never> {
  private node = React.createRef<HTMLDivElement>();

  render() {
    const {visible, children} = this.props;

    const searchClassName = classNames(
      styles.Search,
      visible && styles.visible,
    );

    return (
      <div
        ref={this.node}
        className={searchClassName}
        onClick={this.handleDismiss}
      >
        <div className={styles.Overlay}>{children}</div>
      </div>
    );
  }

  @autobind
  private handleDismiss({target}: React.MouseEvent<HTMLElement>) {
    const {onDismiss} = this.props;

    if (onDismiss != null && target === this.node.current) {
      onDismiss();
    }
  }
}
