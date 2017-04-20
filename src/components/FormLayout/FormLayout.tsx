import * as React from 'react';
import {wrapWithComponent, isElementOfType} from '@shopify/react-utilities/components';

import Group from './Group';
import Item, {Props as ItemProps} from './Item';
import * as styles from './FormLayout.scss';

export interface Props {
  children?: React.ReactNode,
}

export default class FormLayout extends React.PureComponent<Props, never> {
  static Group = Group;

  render() {
    const {children} = this.props;

    return (
      <div className={styles.FormLayout}>
        {React.Children.map(children, wrapChildren)}
      </div>
    );
  }
}

function wrapChildren(child: React.ReactElement<{}>, index: number) {
  if (isElementOfType(child, Group)) { return child; }
  return wrapWithComponent(child, Item, {key: index} as ItemProps);
}
