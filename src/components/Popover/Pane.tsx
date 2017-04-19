import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {wrapWithComponent} from '@shopify/react-utilities/components';

import Scrollable from '../Scrollable';

import Section from './Section';
import * as styles from './Popover.scss';

export interface Props {
  fixed?: boolean,
  sectioned?: boolean,
  children?: React.ReactNode,
}

export default function Pane({fixed, sectioned, children}: Props) {
  const className = classNames(
    styles.Pane,
    fixed && styles.fixed,
  );

  const content = sectioned
    ? wrapWithComponent(children, Section)
    : children;

  return fixed
    ? (
      <div className={className}>
        {content}
      </div>
    )
    : (
      <Scrollable className={className}>
        {content}
      </Scrollable>
    );
}
