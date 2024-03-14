import React from 'react';

import {classNames} from '../../../../utilities/css';
import {wrapWithComponent} from '../../../../utilities/components';
import {Scrollable} from '../../../Scrollable';
import {Section} from '../Section';
import styles from '../../Popover.module.css';

export interface PaneProps {
  /** Fix the pane to the top of the popover */
  fixed?: boolean;
  /** Automatically wrap children in padded sections */
  sectioned?: boolean;
  /** The pane content */
  children?: React.ReactNode;
  /** Sets a fixed height and max-height on the Scrollable */
  height?: string;
  /** Callback when the bottom of the popover is reached by mouse or keyboard  */
  onScrolledToBottom?(): void;
  /**
   * Prevents page scrolling when the end of the scrollable Popover content is reached
   * @default false
   */
  captureOverscroll?: boolean;
  /**
   * Sets a subdued background to the pane
   * @default false
   */
  subdued?: boolean;
}

export function Pane({
  captureOverscroll = false,
  fixed,
  sectioned,
  children,
  height,
  subdued,
  onScrolledToBottom,
}: PaneProps) {
  const className = classNames(
    styles.Pane,
    fixed && styles['Pane-fixed'],
    subdued && styles['Pane-subdued'],
    captureOverscroll && styles['Pane-captureOverscroll'],
  );
  const content = sectioned
    ? wrapWithComponent(children, Section, {})
    : children;
  const style = height
    ? {height, maxHeight: height, minHeight: height}
    : undefined;

  return fixed ? (
    <div style={style} className={className}>
      {content}
    </div>
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
