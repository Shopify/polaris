import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities';

import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import UnstyledLink from '../UnstyledLink';
import Icon, {Props as IconProps} from '../Icon';
import Spinner from '../Spinner';
import * as styles from './Button.scss';

export type Size = 'slim' | 'medium' | 'large';

export type IconSource = IconProps['source'];

export interface Props {
  /** The content to display inside the button */
  children?: string | string[];
  /** A destination to link to, rendered in the href attribute of a link */
  url?: string;
  /** A unique identifier for the button */
  id?: string;
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
  /** Indicates a dangerous or potentially negative action */
  destructive?: boolean;
  /** Disables the button, disallowing merchant interaction */
  disabled?: boolean;
  /** Replaces button text with a spinner while a background action is being performed */
  loading?: boolean;
  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: Size;
  /** Gives the button a subtle alternative to the default button styling, appropriate for certain backdrops */
  outline?: boolean;
  /** Allows the button to grow to the width of its container */
  fullWidth?: boolean;
  /** Displays the button with a disclosure icon */
  disclosure?: boolean;
  /** Allows the button to submit a form */
  submit?: boolean;
  /** Renders a button that looks like a link */
  plain?: boolean;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Icon to display to the left of the button content */
  icon?: React.ReactNode | IconSource;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Id of the element the button controls */
  ariaControls?: string;
  /** Tells screen reader the controlled element is expanded */
  ariaExpanded?: boolean;
  /** Callback when clicked */
  onClick?(): void;
  /** Callback when button becomes focussed */
  onFocus?(): void;
  /** Callback when focus leaves button */
  onBlur?(): void;
}

export type CombinedProps = Props & WithAppProviderProps;

const DEFAULT_SIZE = 'medium';

function Button({
  id,
  url,
  disabled,
  loading,
  children,
  accessibilityLabel,
  ariaControls,
  ariaExpanded,
  onClick,
  onFocus,
  onBlur,
  external,
  icon,
  primary,
  outline,
  destructive,
  disclosure,
  plain,
  submit,
  size = DEFAULT_SIZE,
  fullWidth,
  polaris: {intl},
}: CombinedProps) {
  const isDisabled = disabled || loading;
  const className = classNames(
    styles.Button,
    primary && styles.primary,
    outline && styles.outline,
    destructive && styles.destructive,
    isDisabled && styles.disabled,
    loading && styles.loading,
    plain && styles.plain,
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
    fullWidth && styles.fullWidth,
    icon && children == null && styles.iconOnly,
  );

  const disclosureIconMarkup = disclosure ? (
    <IconWrapper>
      <Icon source={loading ? 'placeholder' : 'caretDown'} />
    </IconWrapper>
  ) : null;

  let iconMarkup;

  if (icon) {
    const iconInner = isIconSource(icon) ? (
      <Icon source={loading ? 'placeholder' : icon} />
    ) : (
      icon
    );
    iconMarkup = <IconWrapper>{iconInner}</IconWrapper>;
  }

  const childMarkup = children ? <span>{children}</span> : null;

  const spinnerColor = primary || destructive ? 'white' : 'inkLightest';

  const spinnerSVGMarkup = loading ? (
    <span className={styles.Spinner}>
      <Spinner
        size="small"
        color={spinnerColor}
        accessibilityLabel={intl.translate(
          'Polaris.Button.spinnerAccessibilityLabel',
        )}
      />
    </span>
  ) : null;

  const content =
    iconMarkup || disclosureIconMarkup ? (
      <span className={styles.Content}>
        {spinnerSVGMarkup}
        {iconMarkup}
        {childMarkup}
        {disclosureIconMarkup}
      </span>
    ) : (
      <span className={styles.Content}>
        {spinnerSVGMarkup}
        {childMarkup}
      </span>
    );

  const type = submit ? 'submit' : 'button';

  if (url) {
    return isDisabled ? (
      // Render an `<a>` so toggling disabled/enabled state changes only the
      // `href` attribute instead of replacing the whole element.
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a id={id} className={className} aria-label={accessibilityLabel}>
        {content}
      </a>
    ) : (
      <UnstyledLink
        id={id}
        url={url}
        external={external}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseUp={handleMouseUpByBlurring}
        className={className}
        aria-label={accessibilityLabel}
      >
        {content}
      </UnstyledLink>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseUp={handleMouseUpByBlurring}
      className={className}
      disabled={isDisabled}
      aria-label={accessibilityLabel}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      role={loading ? 'alert' : undefined}
      aria-busy={loading ? true : undefined}
    >
      {content}
    </button>
  );
}

export function IconWrapper({children}: any) {
  return <span className={styles.Icon}>{children}</span>;
}

function isIconSource(x: any): x is IconSource {
  return typeof x === 'string' || (typeof x === 'object' && x.body);
}

export default withAppProvider<Props>()(Button);
