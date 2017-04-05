import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {wrapWithComponent, isElementOfType} from '@shopify/react-utilities/components';

import Group from './Group';
import Item, {Props as ItemProps} from './Item';
import * as styles from './FormLayout.scss';

const {Children} = React;

export interface Props {
  children?: React.ReactNode,
  condensed?: boolean,
}

export default class FormLayout extends React.PureComponent<Props, {}> {
  static Item = Item;
  static Group = Group;

  render() {
    const {children, condensed} = this.props;

    const className = classNames(
      styles.FormLayout,
      condensed && styles.condensed,
    );

    return (
        <div className={className}>
          {Children.map(children, wrapChildren)}
        </div>
      );
  }
}

function wrapChildren(child: React.ReactElement<{}>, index: number) {
  if (isElementOfType(child, Group)) { return child; }

  return wrapWithComponent(child, Item, {key: index} as ItemProps);
}
