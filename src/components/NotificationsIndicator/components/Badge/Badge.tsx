import React, {useContext} from 'react';

import {classNames, variationName} from '../../../../../../utilities/css';
import {useI18n} from '../../../../../../utilities/i18n';
import {WithinFilterContext} from '../../../../../../utilities/within-filter-context';
import {VisuallyHidden} from '../../../../../VisuallyHidden';

import styles from './Badge.scss';

type Status = 'success' | 'info' | 'attention' | 'critical' | 'warning' | 'new';
type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
type Size = 'small' | 'medium';

export interface BadgeProps {
  /** The content to display inside the badge. */
  children?: string;
  /** Set the color of the badge for the given status. */
  status?: Status;
  /** Render a pip showing the progress of a given task. */
  progress?: Progress;
  /**
   * Medium or small size. Use `small` only in the main navigation of an app frame.
   * @default 'medium'
   */
  size?: Size;
  /** Pass a custom accessibilityLabel */
  statusAndProgressLabelOverride?: string;
}

const PROGRESS_LABELS: {[key in Progress]: Progress} = {
  incomplete: 'incomplete',
  partiallyComplete: 'partiallyComplete',
  complete: 'complete',
};

const STATUS_LABELS: {[key in Status]: Status} = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  critical: 'critical',
  attention: 'attention',
  new: 'new',
};

const DEFAULT_SIZE = 'medium';

export function Badge({
  children,
  status,
  progress,
  size = DEFAULT_SIZE,
  statusAndProgressLabelOverride,
}: BadgeProps) {
  const i18n = useI18n();
  const withinFilter = useContext(WithinFilterContext);

  const className = classNames(
    styles.Badge,
    status && styles[variationName('status', status)],
    progress && styles[variationName('progress', progress)],
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
    withinFilter && styles.withinFilter,
  );

  let progressLabel = '';
  switch (progress) {
    case PROGRESS_LABELS.incomplete:
      progressLabel = i18n.translate(
        'Polaris.Badge.PROGRESS_LABELS.incomplete',
      );
      break;
    case PROGRESS_LABELS.partiallyComplete:
      progressLabel = i18n.translate(
        'Polaris.Badge.PROGRESS_LABELS.partiallyComplete',
      );
      break;
    case PROGRESS_LABELS.complete:
      progressLabel = i18n.translate('Polaris.Badge.PROGRESS_LABELS.complete');
      break;
  }

  let statusLabel = '';
  switch (status) {
    case STATUS_LABELS.info:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.info');
      break;
    case STATUS_LABELS.success:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.success');
      break;
    case STATUS_LABELS.warning:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.warning');
      break;
    case STATUS_LABELS.critical:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.critical');
      break;
    case STATUS_LABELS.attention:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.attention');
      break;
    case STATUS_LABELS.new:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.new');
      break;
  }

  const accessibilityLabel = statusAndProgressLabelOverride
    ? statusAndProgressLabelOverride
    : i18n.translate('Polaris.Badge.progressAndStatus', {
        progressLabel,
        statusLabel,
      });

  const hasAccessibilityLabel =
    progressLabel || statusLabel || statusAndProgressLabelOverride;

  let accessibilityMarkup = hasAccessibilityLabel && (
    <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
  );

  if (progressLabel) {
    accessibilityMarkup = (
      <span className={styles.Pip}>{accessibilityMarkup}</span>
    );
  }

  return (
    <span className={className}>
      {accessibilityMarkup}
      {children}
    </span>
  );
}
