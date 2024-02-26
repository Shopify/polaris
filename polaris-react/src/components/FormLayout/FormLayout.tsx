import React, {memo, Children} from 'react';
import type {NamedExoticComponent} from 'react';

import {wrapWithComponent, isElementOfType} from '../../utilities/components';

import styles from './FormLayout.module.scss';
import {Group, Item} from './components';

export interface FormLayoutProps {
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

export const FormLayout = memo(function FormLayout({
  children,
}: FormLayoutProps) {
  return (
    <div className={styles.FormLayout}>
      {Children.map(children, wrapChildren)}
    </div>
  );
}) as NamedExoticComponent<FormLayoutProps> & {
  Group: typeof Group;
};

FormLayout.Group = Group;

export function wrapChildren(
  child: React.ReactElement,
  index: number,
  props?: any,
) {
  if (isElementOfType(child, Group)) {
    return child;
  }
  const childProps = {key: index, ...props};
  return wrapWithComponent(child, Item, childProps);
}
