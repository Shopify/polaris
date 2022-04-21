import React from 'react';

import {classNames} from '../../../../utilities/css';
import {wrapWithComponent} from '../../../../utilities/components';
import {Scrollable} from '../../../Scrollable';
import {Section} from '../Section';
import styles from '../../Popover.scss';

export interface PaneProps {
  /** Fix the pane to the top of the popover */
  fixed?: boolean;
  /** Automatically wrap children in padded sections */
  sectioned?: boolean;
  /** The pane content */
  children?: React.ReactNode;
  /** Maximum height to set on the popover pane */
  maxHeight?: string;
  /** Callback when the bottom of the popover is reached by mouse or keyboard  */
  onScrolledToBottom?(): void;
}

export function Pane({
  fixed,
  sectioned,
  children,
  maxHeight,
  onScrolledToBottom,
}: PaneProps) {
  const className = classNames(styles.Pane, fixed && styles['Pane-fixed']);
  const content = sectioned
    ? wrapWithComponent(children, Section, {})
    : children;
  const style = maxHeight ? {maxHeight} : undefined;

  return fixed ? (
    <div className={className}>{content}</div>
  ) : (
    <Scrollable
      shadow
      className={className}
      style={style}
      onScrolledToBottom={onScrolledToBottom}
    >
      {content}
    </Scrollable>
  );
}
