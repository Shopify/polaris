import type {I18n} from '../../utilities/i18n';

import {ProgressValue, StatusValue} from './types';
import type {Progress, Status} from './types';

export function getDefaultAccessibilityLabel(
  i18n: I18n,
  progress?: Progress,
  status?: Status,
): string {
  let progressLabel = '';
  let statusLabel = '';

  if (!progress && !status) {
    return '';
  }

  switch (progress) {
    case ProgressValue.Incomplete:
      progressLabel = i18n.translate(
        'Polaris.Badge.PROGRESS_LABELS.incomplete',
      );
      break;
    case ProgressValue.PartiallyComplete:
      progressLabel = i18n.translate(
        'Polaris.Badge.PROGRESS_LABELS.partiallyComplete',
      );
      break;
    case ProgressValue.Complete:
      progressLabel = i18n.translate('Polaris.Badge.PROGRESS_LABELS.complete');
      break;
  }

  switch (status) {
    case StatusValue.Info:
    case StatusValue.InfoStrongExperimental:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.info');
      break;
    case StatusValue.Success:
    case StatusValue.SuccessStrongExperimental:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.success');
      break;
    case StatusValue.Warning:
    case StatusValue.WarningStrongExperimental:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.warning');
      break;
    case StatusValue.Critical:
    case StatusValue.CriticalStrongExperimental:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.critical');
      break;
    case StatusValue.Attention:
    case StatusValue.AttentionStrongExperimental:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.attention');
      break;
    case StatusValue.New:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.new');
      break;

    // TODO: Add ReadOnlyExperimental and EnabledExperimental
  }

  if (!status && progress) {
    return progressLabel;
  } else if (status && !progress) {
    return statusLabel;
  } else {
    return i18n.translate('Polaris.Badge.progressAndStatus', {
      progressLabel,
      statusLabel,
    });
  }
}
