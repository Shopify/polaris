import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import VisuallyHidden from '../VisuallyHidden';
import * as styles from './Badge.scss';

export type Status = 'success' | 'info' | 'attention' | 'warning' | 'new';
export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
export type Size = 'small' | 'medium';

export interface Props {
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
}

export type CombinedProps = Props & WithAppProviderProps;

export const PROGRESS_LABELS: {[key in Progress]: Progress} = {
  incomplete: 'incomplete',
  partiallyComplete: 'partiallyComplete',
  complete: 'complete',
};

export const STATUS_LABELS: {[key in Status]: Status} = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  attention: 'attention',
  new: 'new',
};

const DEFAULT_SIZE = 'medium';

function Badge({
  children,
  status,
  progress,
  size = DEFAULT_SIZE,
  polaris: {intl},
}: CombinedProps) {
  const className = classNames(
    styles.Badge,
    status && styles[variationName('status', status)],
    progress && styles[variationName('progress', progress)],
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
  );

  let progressMarkup;
  switch (progress) {
    case PROGRESS_LABELS.incomplete:
      progressMarkup = intl.translate(
        'Polaris.Badge.PROGRESS_LABELS.incomplete',
      );
      break;
    case PROGRESS_LABELS.partiallyComplete:
      progressMarkup = intl.translate(
        'Polaris.Badge.PROGRESS_LABELS.partiallyComplete',
      );
      break;
    case PROGRESS_LABELS.complete:
      progressMarkup = intl.translate('Polaris.Badge.PROGRESS_LABELS.complete');
      break;
  }

  const pipMarkup = progress ? (
    <span className={styles.Pip}>
      <VisuallyHidden>{progressMarkup}</VisuallyHidden>
    </span>
  ) : null;

  let statusMarkup;
  switch (status) {
    case STATUS_LABELS.info:
      statusMarkup = intl.translate('Polaris.Badge.STATUS_LABELS.info');
      break;
    case STATUS_LABELS.success:
      statusMarkup = intl.translate('Polaris.Badge.STATUS_LABELS.success');
      break;
    case STATUS_LABELS.warning:
      statusMarkup = intl.translate('Polaris.Badge.STATUS_LABELS.warning');
      break;
    case STATUS_LABELS.attention:
      statusMarkup = intl.translate('Polaris.Badge.STATUS_LABELS.attention');
      break;
    case STATUS_LABELS.new:
      statusMarkup = intl.translate('Polaris.Badge.STATUS_LABELS.new');
      break;
  }

  const statusLabelMarkup = status ? (
    <VisuallyHidden>{statusMarkup}</VisuallyHidden>
  ) : null;

  return (
    <span className={className}>
      {statusLabelMarkup}
      {pipMarkup}
      {children}
    </span>
  );
}

export default withAppProvider<Props>()(Badge);
