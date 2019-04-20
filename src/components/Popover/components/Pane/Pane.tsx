import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {wrapWithComponent} from '@shopify/react-utilities';

import Scrollable from '../../../Scrollable';

import Section from '../Section';
import styles from '../../Popover.scss';

export interface Props {
  /** Fix the pane to the top of the popover */
  fixed?: boolean;
  /** Automatically wrap children in padded sections */
  sectioned?: boolean;
  /** The pane content */
  children?: React.ReactNode;
  /** Callback when the bottom of the popover is reached by mouse or keyboard  */
  onScrolledToBottom?(): void;
}

export default function Pane({
  fixed,
  sectioned,
  children,
  onScrolledToBottom,
}: Props) {
  const className = classNames(styles.Pane, fixed && styles['Pane-fixed']);
  const content = sectioned ? wrapWithComponent(children, Section) : children;

  return fixed ? (
    <div className={className}>{content}</div>
  ) : (
    <Scrollable
      hint
      shadow
      className={className}
      onScrolledToBottom={onScrolledToBottom}
    >
      {content}
    </Scrollable>
  );
}
