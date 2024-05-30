import React, {useState, useRef, useEffect, useCallback} from 'react';

import {classNames} from '../../utilities/css';
import type {ComplexAction, ActionListItemDescriptor} from '../../types';
import {Box} from '../Box';
import {buttonFrom} from '../Button';
import {Image} from '../Image';
import {Text} from '../Text';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {BlockStack} from '../BlockStack';
import {InlineStack} from '../InlineStack';

import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  /** The empty state heading */
  heading?: string;
  /**
   * The path to the image to display.
   * The image should have ~40px of white space above when empty state is used within a card, modal, or navigation component
   */
  image: string;
  /** The path to the image to display on large screens */
  largeImage?: string;
  /** Whether or not to limit the image to the size of its container on large screens */
  imageContained?: boolean;
  /** Whether or not the content should span the full width of its container  */
  fullWidth?: boolean;
  /** Elements to display inside empty state */
  children?: React.ReactNode;
  /** Primary action for empty state */
  action?: ComplexAction;
  /** List of actions for primary button */
  actionList?: ActionListItemDescriptor[];
  /** Secondary action for empty state */
  secondaryAction?: ComplexAction;
  /** List of actions for secondary button */
  secondaryActionList?: ActionListItemDescriptor[];
  /** Secondary elements to display below empty state actions */
  footerContent?: React.ReactNode;
}

interface MarkupBuilder {
  (
    action: ComplexAction | undefined,
    actionList: ActionListItemDescriptor[] | undefined,
    onClick: () => void,
    variant: 'primary' | 'secondary',
    isActive: boolean,
  ): React.ReactNode;
}

export const buildMarkupSection: MarkupBuilder = (
  action,
  actionList,
  onClick,
  variant,
  isActive,
) => {
  const actionMarkup = action
    ? buttonFrom(action, {
        variant,
        size: 'medium',
        url: actionList ? undefined : action?.url,
        disclosure: Boolean(actionList),
        onClick,
      })
    : null;

  const actionPopover = actionMarkup ? (
    <Popover
      active={isActive}
      activator={actionMarkup}
      autofocusTarget="first-node"
      onClose={onClick}
    >
      <ActionList actionRole="menuitem" items={actionList || []} />
    </Popover>
  ) : null;

  return actionList ? actionPopover : actionMarkup;
};

export function EmptyState({
  children,
  heading,
  image,
  largeImage,
  imageContained,
  fullWidth = false,
  action,
  actionList,
  secondaryAction,
  secondaryActionList,
  footerContent,
}: EmptyStateProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current?.complete) setImageLoaded(true);
  }, []);

  const imageClassNames = classNames(
    styles.Image,
    imageLoaded && styles.loaded,
    imageContained && styles.imageContained,
  );

  const loadedImageMarkup = largeImage ? (
    <Image
      alt=""
      role="presentation"
      ref={imageRef}
      source={largeImage}
      className={imageClassNames}
      sourceSet={[
        {source: image, descriptor: '568w'},
        {source: largeImage, descriptor: '1136w'},
      ]}
      sizes="(max-width: 568px) 60vw"
      onLoad={() => setImageLoaded(true)}
    />
  ) : (
    <Image
      alt=""
      role="presentation"
      ref={imageRef}
      className={imageClassNames}
      source={image}
      onLoad={() => setImageLoaded(true)}
    />
  );

  const skeletonImageClassNames = classNames(
    styles.SkeletonImage,
    imageLoaded && styles.loaded,
  );

  const imageContainerClassNames = classNames(
    styles.ImageContainer,
    !imageLoaded && styles.SkeletonImageContainer,
  );

  const imageMarkup = (
    <div className={imageContainerClassNames}>
      {loadedImageMarkup}
      <div className={skeletonImageClassNames} />
    </div>
  );

  const footerContentMarkup = footerContent ? (
    <Box paddingBlockStart="400">
      <Text as="span" alignment="center" variant="bodySm">
        {footerContent}
      </Text>
    </Box>
  ) : null;

  const [primaryPopoverActive, setPrimaryPopoverActive] = useState(false);
  const togglePrimaryPopoverActive = useCallback(
    () => setPrimaryPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const [secondaryPopoverActive, setSecondaryPopoverActive] = useState(false);
  const toggleSecondaryPopoverActive = useCallback(
    () => setSecondaryPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const headingMarkup = heading ? (
    <Box paddingBlockEnd="150">
      <Text variant="headingMd" as="p" alignment="center">
        {heading}
      </Text>
    </Box>
  ) : null;

  const childrenMarkup = children ? (
    <Text as="span" alignment="center" variant="bodySm">
      {children}
    </Text>
  ) : null;

  const textContentMarkup =
    headingMarkup || children ? (
      <Box paddingBlockEnd="400">
        {headingMarkup}
        {childrenMarkup}
      </Box>
    ) : null;

  const primaryActionMarkup = buildMarkupSection(
    action,
    actionList,
    togglePrimaryPopoverActive,
    'primary',
    primaryPopoverActive,
  );

  const secondaryActionMarkup = buildMarkupSection(
    secondaryAction,
    secondaryActionList,
    toggleSecondaryPopoverActive,
    'secondary',
    secondaryPopoverActive,
  );

  const actionsMarkup =
    primaryActionMarkup || secondaryActionMarkup ? (
      <InlineStack align="center" gap="200">
        {secondaryActionMarkup}
        {primaryActionMarkup}
      </InlineStack>
    ) : null;

  const detailsMarkup =
    textContentMarkup || actionsMarkup || footerContentMarkup ? (
      <Box maxWidth={fullWidth ? '100%' : '400px'}>
        <BlockStack inlineAlign="center">
          {textContentMarkup}
          {actionsMarkup}
          {footerContentMarkup}
        </BlockStack>
      </Box>
    ) : null;

  return (
    <Box
      paddingInlineStart="0"
      paddingInlineEnd="0"
      paddingBlockStart="500"
      paddingBlockEnd="1600"
    >
      <BlockStack inlineAlign="center">
        {imageMarkup}
        {detailsMarkup}
      </BlockStack>
    </Box>
  );
}
