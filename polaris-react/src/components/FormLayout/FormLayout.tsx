import React, {memo, Children} from 'react';
import type {NamedExoticComponent} from 'react';

import {wrapWithComponent, isElementOfType} from '../../utilities/components';

import styles from './FormLayout.scss';
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

function wrapChildren(child: React.ReactElement, index: number) {
  if (isElementOfType(child, Group)) {
    return child;
  }
  const props = {key: index};
  return wrapWithComponent(child, Item, props);
}
