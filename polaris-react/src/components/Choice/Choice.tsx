import React from 'react';
import type {SpaceScale} from '@shopify/polaris-tokens';

import {
  getResponsiveProps,
  getResponsiveValue,
  classNames,
  sanitizeCustomProperties,
  variationName,
} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';
import type {Error} from '../../types';
import {InlineError} from '../InlineError';
import {Text} from '../Text';

import styles from './Choice.module.css';

type Spacing = ResponsiveProp<SpaceScale>;

export interface ChoiceBleedProps {
  /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * bleed='4'
   * bleed={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  bleed?: Spacing;
  /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * bleedBlockStart='4'
   * bleedBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  bleedBlockStart?: Spacing;
  /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * bleedBlockEnd='4'
   * bleedBlockEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  bleedBlockEnd?: Spacing;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * bleedInlineStart='4'
   * bleedInlineStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  bleedInlineStart?: Spacing;
  /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * bleedInlineEnd='4'
   * bleedInlineEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  bleedInlineEnd?: Spacing;
}

interface ChoiceProps extends ChoiceBleedProps {
  /** A unique identifier for the choice */
  id: string;
  /**	Label for the choice */
  label: React.ReactNode;
  /** Whether the associated form control is disabled */
  disabled?: boolean;
  /** Visually hide the label */
  labelHidden?: boolean;
  /**  Content to display inside the choice */
  children?: React.ReactNode;
  /** Callback when clicked */
  onClick?(): void;
  /** Added to the label element */
  labelClassName?: string;
  /** Grow to fill the space. Equivalent to width: 100%; height: 100% */
  fill?: ResponsiveProp<boolean>;
  /** Display an error message */
  error?: Error | boolean;
  /** Additional text to aide in use. Will add a wrapping <div> */
  helpText?: React.ReactNode;
  /** Indicates the tone of the choice */
  tone?: 'magic';
}

export function Choice({
  id,
  label,
  disabled,
  error,
  children,
  labelHidden,
  helpText,
  onClick,
  labelClassName,
  fill,
  bleed,
  bleedBlockStart,
  bleedBlockEnd,
  bleedInlineStart,
  bleedInlineEnd,
  tone,
}: ChoiceProps) {
  const className = classNames(
    styles.Choice,
    labelHidden && styles.labelHidden,
    disabled && styles.disabled,
    tone && styles[variationName('tone', tone)],
    labelClassName,
  );

  const labelStyle = {
    // Pass through overrides for bleed values if they're set by the prop
    ...getResponsiveProps(
      'choice',
      'bleed-block-end',
      'space',
      bleedBlockEnd || bleed,
    ),
    ...getResponsiveProps(
      'choice',
      'bleed-block-start',
      'space',
      bleedBlockStart || bleed,
    ),
    ...getResponsiveProps(
      'choice',
      'bleed-inline-start',
      'space',
      bleedInlineStart || bleed,
    ),
    ...getResponsiveProps(
      'choice',
      'bleed-inline-end',
      'space',
      bleedInlineEnd || bleed,
    ),
    ...Object.fromEntries(
      Object.entries(getResponsiveValue('choice', 'fill', fill)).map(
        // Map "true" => "100%" and "false" => "auto" for use in
        // inline/block-size calc()
        ([key, value]) => [key, value ? '100%' : 'auto'],
      ),
    ),
  } as React.CSSProperties;

  const labelMarkup = (
    // NOTE: Can't use a Box here for a few reasons:
    // - as="label" fails `Element` typecheck (even though the JS works)
    // - Can't pass hard coded values to padding (forced to tokens)
    // - Can't pass negative values to padding
    // - Can't pass margins at all
    <label
      className={className}
      htmlFor={id}
      onClick={onClick}
      style={sanitizeCustomProperties(labelStyle)}
    >
      <span className={styles.Control}>{children}</span>
      <span className={styles.Label}>
        <Text as="span" variant="bodyMd">
          {label}
        </Text>
      </span>
    </label>
  );

  const helpTextMarkup = helpText ? (
    <div className={styles.HelpText} id={helpTextID(id)}>
      <Text
        as="span"
        // `undefined` means color: inherit
        // the nearest ancestor with a specified color is .Descriptions in Choice.scss
        tone={disabled ? undefined : 'subdued'}
      >
        {helpText}
      </Text>
    </div>
  ) : null;

  const errorMarkup = error && typeof error !== 'boolean' && (
    <div className={styles.Error}>
      <InlineError message={error} fieldID={id} />
    </div>
  );

  const descriptionMarkup =
    helpTextMarkup || errorMarkup ? (
      <div className={styles.Descriptions}>
        {errorMarkup}
        {helpTextMarkup}
      </div>
    ) : null;

  return descriptionMarkup ? (
    <div>
      {labelMarkup}
      {descriptionMarkup}
    </div>
  ) : (
    labelMarkup
  );
}

export function helpTextID(id: string) {
  return `${id}HelpText`;
}
