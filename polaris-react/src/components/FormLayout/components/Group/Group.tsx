import React, {Children, useId} from 'react';

import {wrapWithComponent} from '../../../../utilities/components';
import {Box} from '../../../Box';
import {InlineStack} from '../../../InlineStack';
import {BlockStack} from '../../../BlockStack';
import {Text} from '../../../Text';
import {Item} from '../Item';
import styles from '../../FormLayout.scss';

interface PresentationalGroupProps {
  presentational?: boolean;
}

interface AccessibilityGroupProps {
  title?: string;
  helpText?: React.ReactNode;
}

interface BaseGroupProps {
  /** Unique identifier for the form group */
  id?: string;
  /** The child inputs to group */
  children?: React.ReactNode;
  /** Whether to reduce the min-width of child inputs by 50%. Use for inline groups of inputs with short character length, like numeric dimensions. */
  condensed?: boolean;
  /**  Use when nesting a group inside of another for layout purposes. Presentational groups will not have a role of "group" and cannot be given a title or help text. */
  presentational?: boolean;
  /** Label describing the input group */
  title?: string;
  /** Helpful text for the input group */
  helpText?: React.ReactNode;
  /** Flex direction of the input group
   * @default 'inline'
   */
  variant?: 'inline' | 'block';
}

type MutuallyExclusivePresentationalProps =
  | PresentationalGroupProps
  | AccessibilityGroupProps;

type GroupProps = BaseGroupProps & MutuallyExclusivePresentationalProps;

export function Group({
  id: providedId,
  children,
  condensed,
  presentational,
  title,
  helpText,
  variant = 'inline',
  ...rest
}: GroupProps) {
  const generatedId = useId();

  let helpTextElement = null;
  let helpTextId: undefined | string;
  let titleElement = null;
  let titleId: undefined | string;

  const role = presentational ? undefined : 'group';
  const id = providedId ?? generatedId;

  if (helpText && !presentational) {
    helpTextId = `${id}HelpText`;
    helpTextElement = (
      <Box id={helpTextId} color="text-secondary">
        {helpText}
      </Box>
    );
  }

  if (title && !presentational) {
    titleId = `${id}Title`;
    titleElement = (
      <Text id={titleId} as="p">
        {title}
      </Text>
    );
  }

  // Children.toArray removes empty nodes, preventing wrapping of null etc
  const childMarkup = Children.toArray(children).map(
    (child: React.ReactElement) => {
      if (isGroup(child.props)) {
        return child;
      }

      return wrapWithComponent(child, Item, {condensed});
    },
  );

  const InputWrapper = variant === 'inline' ? InlineStack : BlockStack;

  return (
    <div
      {...rest}
      role={role}
      className={styles.Group}
      aria-labelledby={titleId}
      aria-describedby={helpTextId}
      data-form-layout-group
    >
      {titleElement}
      <InputWrapper gap="300">{childMarkup}</InputWrapper>
      {helpTextElement}
    </div>
  );
}

function isGroup(props: any): props is GroupProps {
  return props['data-form-layout-group'] !== undefined;
}
