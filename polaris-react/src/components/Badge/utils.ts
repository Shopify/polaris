import type {I18n} from '../../utilities/i18n';

import {ProgressValue, ToneValue} from './types';
import type {Progress, Tone} from './types';

export function getDefaultAccessibilityLabel(
  i18n: I18n,
  progress?: Progress,
  tone?: Tone,
): string {
  let progressLabel = '';
  let toneLabel = '';

  if (!progress && !tone) {
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

  switch (tone) {
    case ToneValue.Info:
    case ToneValue.InfoStrong:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.info');
      break;
    case ToneValue.Success:
    case ToneValue.SuccessStrong:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.success');
      break;
    case ToneValue.Warning:
    case ToneValue.WarningStrong:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.warning');
      break;
    case ToneValue.Critical:
    case ToneValue.CriticalStrong:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.critical');
      break;
    case ToneValue.Attention:
    case ToneValue.AttentionStrong:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.attention');
      break;
    case ToneValue.New:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.new');
      break;
    case ToneValue.ReadOnly:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.readOnly');
      break;
    case ToneValue.Enabled:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.enabled');
      break;
  }

  if (!tone && progress) {
    return progressLabel;
  } else if (tone && !progress) {
    return toneLabel;
  } else {
    return i18n.translate('Polaris.Badge.progressAndTone', {
      progressLabel,
      toneLabel,
    });
  }
}
