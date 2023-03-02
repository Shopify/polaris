import React, {useContext} from 'react';

import {classNames, variationName} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {WithinFilterContext} from '../../utilities/within-filter-context';
import {Text} from '../Text';
import {Icon} from '../Icon';
import type {IconSource} from '../../types';

import styles from './Badge.scss';
import type {Progress, Size, Status} from './types';
import {Pip} from './components';
import {getDefaultAccessibilityLabel} from './utils';

const DEFAULT_SIZE: Size = 'medium';
interface NonMutuallyExclusiveProps {
  /** The content to display inside the badge. */
  children?: string;
  /** Colors and labels the badge with the given status. */
  status?: Status;
  /** Render a pip showing the progress of a given task. */
  progress?: Progress;
  /** Icon to display to the left of the badge’s content. */
  icon?: IconSource;
  /**
   * @deprecated
   * Medium or small size.
   * @default 'medium'
   */
  size?: Size;
  /** Pass a custom accessibilityLabel */
  statusAndProgressLabelOverride?: string;
}

export type BadgeProps = NonMutuallyExclusiveProps &
  (
    | {progress?: Progress; icon?: undefined}
    | {icon?: IconSource; progress?: undefined}
  );

export function Badge({
  children,
  status,
  progress,
  icon,
  size = DEFAULT_SIZE,
  statusAndProgressLabelOverride,
}: BadgeProps) {
  const i18n = useI18n();
  const withinFilter = useContext(WithinFilterContext);

  const className = classNames(
    styles.Badge,
    status && styles[variationName('status', status)],
    icon && styles.icon,
    // TODO: remove support for the size prop in the next major release
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
    withinFilter && styles.withinFilter,
  );

  const accessibilityLabel = statusAndProgressLabelOverride
    ? statusAndProgressLabelOverride
    : getDefaultAccessibilityLabel(i18n, progress, status);

  let accessibilityMarkup = Boolean(accessibilityLabel) && (
    <Text as="span" visuallyHidden>
      {accessibilityLabel}
    </Text>
  );

  if (progress && !icon) {
    accessibilityMarkup = (
      <span className={styles.PipContainer}>
        <Pip
          progress={progress}
          status={status}
          accessibilityLabelOverride={accessibilityLabel}
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
          fontWeight={status === 'new' ? 'medium' : undefined}
        >
          {children}
        </Text>
      )}
    </span>
  );
}

Badge.Pip = Pip;
