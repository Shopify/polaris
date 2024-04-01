import React, {useContext} from 'react';

import {classNames, variationName} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {WithinFilterContext} from '../../utilities/within-filter-context';
import {Text} from '../Text';
import {Icon} from '../Icon';
import type {IconSource} from '../../types';

import styles from './Badge.module.css';
import type {Progress, Size, Tone} from './types';
import {Pip} from './components';
import {getDefaultAccessibilityLabel} from './utils';

const DEFAULT_SIZE: Size = 'medium';
interface NonMutuallyExclusiveProps {
  /** The content to display inside the badge. */
  children?: string;
  /** Colors and labels the badge with the given tone. */
  tone?: Tone;
  /** Render a pip showing the progress of a given task. */
  progress?: Progress;
  /** Icon to display to the left of the badge’s content. */
  icon?: IconSource;
  /**
   * @default 'medium'
   */
  size?: Size;
  /** Pass a custom accessibilityLabel */
  toneAndProgressLabelOverride?: string;
}

export type BadgeProps = NonMutuallyExclusiveProps &
  (
    | {progress?: Progress; icon?: undefined}
    | {icon?: IconSource; progress?: undefined}
  );

const progressIconMap: {[P in Progress]: IconSource} = {
  complete: () => (
    <svg viewBox="0 0 20 20">
      <path d="M6 10c0-.93 0-1.395.102-1.776a3 3 0 0 1 2.121-2.122C8.605 6 9.07 6 10 6c.93 0 1.395 0 1.776.102a3 3 0 0 1 2.122 2.122C14 8.605 14 9.07 14 10s0 1.395-.102 1.777a3 3 0 0 1-2.122 2.12C11.395 14 10.93 14 10 14s-1.395 0-1.777-.102a3 3 0 0 1-2.12-2.121C6 11.395 6 10.93 6 10Z" />
    </svg>
  ),
  partiallyComplete: () => (
    <svg viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="m8.888 6.014-.017-.018-.02.02c-.253.013-.45.038-.628.086a3 3 0 0 0-2.12 2.122C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.121 2.12C8.605 14 9.07 14 10 14c.93 0 1.395 0 1.776-.102a3 3 0 0 0 2.122-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.122-2.122C11.395 6 10.93 6 10 6c-.475 0-.829 0-1.112.014ZM8.446 7.34a1.75 1.75 0 0 0-1.041.94l4.314 4.315c.443-.2.786-.576.941-1.042L8.446 7.34Zm4.304 2.536L10.124 7.25c.908.001 1.154.013 1.329.06a1.75 1.75 0 0 1 1.237 1.237c.047.175.059.42.06 1.329ZM8.547 12.69c.182.05.442.06 1.453.06h.106L7.25 9.894V10c0 1.01.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237Z"
      />
    </svg>
  ),
  incomplete: () => (
    <svg viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M8.547 12.69c.183.05.443.06 1.453.06s1.27-.01 1.453-.06a1.75 1.75 0 0 0 1.237-1.237c.05-.182.06-.443.06-1.453s-.01-1.27-.06-1.453a1.75 1.75 0 0 0-1.237-1.237c-.182-.05-.443-.06-1.453-.06s-1.27.01-1.453.06A1.75 1.75 0 0 0 7.31 8.547c-.05.183-.06.443-.06 1.453s.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237ZM6.102 8.224C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.122 2.12C8.605 14 9.07 14 10 14s1.395 0 1.777-.102a3 3 0 0 0 2.12-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.121-2.122C11.395 6 10.93 6 10 6c-.93 0-1.395 0-1.776.102a3 3 0 0 0-2.122 2.122Z"
      />
    </svg>
  ),
};

export function Badge({
  children,
  tone,
  progress,
  icon,
  size = DEFAULT_SIZE,
  toneAndProgressLabelOverride,
}: BadgeProps) {
  const i18n = useI18n();
  const withinFilter = useContext(WithinFilterContext);

  const className = classNames(
    styles.Badge,
    tone && styles[variationName('tone', tone)],
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
    withinFilter && styles.withinFilter,
  );

  const accessibilityLabel = toneAndProgressLabelOverride
    ? toneAndProgressLabelOverride
    : getDefaultAccessibilityLabel(i18n, progress, tone);

  let accessibilityMarkup = Boolean(accessibilityLabel) && (
    <Text as="span" visuallyHidden>
      {accessibilityLabel}
    </Text>
  );

  if (progress && !icon) {
    accessibilityMarkup = (
      <span className={styles.Icon}>
        <Icon
          accessibilityLabel={accessibilityLabel}
          source={progressIconMap[progress]}
        />
      </span>
    );
  }

  return (
    <span className={className}>
      {accessibilityMarkup}
      {icon && (
        <span className={styles.Icon}>
          <Icon source={icon} />
        </span>
      )}
      {children && (
        <Text
          as="span"
          variant="bodySm"
          fontWeight={tone === 'new' ? 'medium' : undefined}
        >
          {children}
        </Text>
      )}
    </span>
  );
}

Badge.Pip = Pip;
