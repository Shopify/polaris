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
  children,
  condensed,
  presentational,
  title,
  helpText,
  variant = 'inline',
}: GroupProps) {
  const id = useId();

  let helpTextElement = null;
  let helpTextId: undefined | string;
  let titleElement = null;
  let titleId: undefined | string;

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

  const itemsMarkup = Children.map(children, (child: React.ReactElement) => {
    if (isGroup(child.props)) {
      return child;
    }

    return wrapWithComponent(child, Item, {condensed});
  });

  const InputWrapper = variant === 'inline' ? InlineStack : BlockStack;

  return (
    <div
      role={presentational ? undefined : 'group'}
      className={styles.Group}
      aria-labelledby={titleId}
      aria-describedby={helpTextId}
    >
      {titleElement}
      <InputWrapper gap="300">{itemsMarkup}</InputWrapper>
      {helpTextElement}
    </div>
  );
}

function isGroup(props: any): props is GroupProps {
  return 'role' in props && props.role === 'group';
}
