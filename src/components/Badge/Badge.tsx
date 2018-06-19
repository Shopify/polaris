import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';
import VisuallyHidden from '../VisuallyHidden';
import * as styles from './Badge.scss';

export type Status = 'success' | 'info' | 'attention' | 'warning' | 'new';
export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

export interface Props {
  /** The content to display inside the badge. */
  children?: string;
  /** Set the color of the badge for the given status. */
  status?: Status;
  /** Render a pip showing the progress of a given task. */
  progress?: Progress;
}

export type CombinedProps = Props & WithAppProviderProps;

const PROGRESS_LABELS = {
  incomplete: 'incomplete',
  partiallyComplete: 'partiallyComplete',
  complete: 'complete',
};

const STATUS_LABELS = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  attention: 'attention',
  new: 'new',
};

function Badge({children, status, progress, polaris: {intl}}: CombinedProps) {
  const className = classNames(
    styles.Badge,
    status && styles[variationName('status', status)],
    progress && styles[variationName('progress', progress)],
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
