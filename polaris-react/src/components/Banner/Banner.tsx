import React, {
  forwardRef,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type {PropsWithChildren} from 'react';
import type {ColorTextAlias} from '@shopify/polaris-tokens';
import {XIcon} from '@shopify/polaris-icons';

import type {Action, DisableableAction, LoadableAction} from '../../types';
import {Text} from '../Text';
import type {InlineStackProps} from '../InlineStack';
import {InlineStack} from '../InlineStack';
import type {BoxProps} from '../Box';
import {Box} from '../Box';
import {Button} from '../Button';
import {ButtonGroup} from '../ButtonGroup';
import {Icon} from '../Icon';
import type {IconProps} from '../Icon';
import {BannerContext} from '../../utilities/banner-context';
import {WithinContentContext} from '../../utilities/within-content-context';
import {classNames} from '../../utilities/css';
import {useBreakpoints} from '../../utilities/breakpoints';
import {useI18n} from '../../utilities/i18n';
import {useEventListener} from '../../utilities/use-event-listener';
import {BlockStack} from '../BlockStack';

import styles from './Banner.module.css';
import type {BannerHandles} from './utilities';
import {bannerAttributes, useBannerFocus} from './utilities';

export type BannerTone = 'success' | 'info' | 'warning' | 'critical';

export interface BannerProps {
  /** Title content for the banner. */
  title?: string;
  /** Status icon to display in the banner. Use only major icons */
  icon?: IconProps['source'];
  /** Renders the banner without a status icon. */
  hideIcon?: boolean;
  /** Sets the status of the banner. */
  tone?: BannerTone;
  /** The child elements to render in the banner. */
  children?: React.ReactNode;
  /** Action for banner */
  action?: DisableableAction & LoadableAction;
  /** Action | Displays a secondary action */
  secondaryAction?: Action;
  /** Callback when banner is dismissed */
  onDismiss?(): void;
  /** Disables screen reader announcements when changing the content of the banner */
  stopAnnouncements?: boolean;
}

export const Banner = forwardRef<BannerHandles, BannerProps>(function Banner(
  props: BannerProps,
  bannerRef,
) {
  const {tone, stopAnnouncements} = props;
  const withinContentContainer = useContext(WithinContentContext);
  const {wrapperRef, handleKeyUp, handleBlur, handleMouseUp, shouldShowFocus} =
    useBannerFocus(bannerRef);
  const className = classNames(
    styles.Banner,
    shouldShowFocus && styles.keyFocused,
    withinContentContainer ? styles.withinContentContainer : styles.withinPage,
  );

  return (
    <BannerContext.Provider value>
      <div
        className={className}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        ref={wrapperRef}
        role={tone === 'warning' || tone === 'critical' ? 'alert' : 'status'}
        aria-live={stopAnnouncements ? 'off' : 'polite'}
        onMouseUp={handleMouseUp}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
      >
        <BannerLayout {...props} />
      </div>
    </BannerContext.Provider>
  );
});

interface BannerLayoutProps {
  backgroundColor: BoxProps['background'];
  textColor: ColorTextAlias;
  bannerTitle: React.ReactNode;
  bannerIcon: React.ReactNode;
  actionButtons: React.ReactNode;
  dismissButton: React.ReactNode;
}

export function BannerLayout({
  tone = 'info',
  icon,
  hideIcon,
  onDismiss,
  action,
  secondaryAction,
  title,
  children,
}: BannerProps) {
  const i18n = useI18n();
  const withinContentContainer = useContext(WithinContentContext);
  const isInlineIconBanner = !title && !withinContentContainer;
  const bannerTone = Object.keys(bannerAttributes).includes(tone)
    ? tone
    : 'info';
  const bannerColors =
    bannerAttributes[bannerTone][
      withinContentContainer ? 'withinContentContainer' : 'withinPage'
    ];

  const sharedBannerProps: BannerLayoutProps = {
    backgroundColor: bannerColors.background,
    textColor: bannerColors.text,
    bannerTitle: title ? (
      <Text as="h2" variant="headingSm" breakWord>
        {title}
      </Text>
    ) : null,
    bannerIcon: hideIcon ? null : (
      <span className={styles[bannerColors.icon]}>
        <Icon source={icon ?? bannerAttributes[bannerTone].icon} />
      </span>
    ),
    actionButtons:
      action || secondaryAction ? (
        <ButtonGroup>
          {action && (
            <Button onClick={action.onAction} {...action}>
              {action.content}
            </Button>
          )}
          {secondaryAction && (
            <Button onClick={secondaryAction.onAction} {...secondaryAction}>
              {secondaryAction.content}
            </Button>
          )}
        </ButtonGroup>
      ) : null,
    dismissButton: onDismiss ? (
      <Button
        variant="tertiary"
        icon={
          <span
            className={
              styles[isInlineIconBanner ? 'icon-secondary' : bannerColors.icon]
            }
          >
            <Icon source={XIcon} />
          </span>
        }
        onClick={onDismiss}
        accessibilityLabel={i18n.translate('Polaris.Banner.dismissButton')}
      />
    ) : null,
  };

  if (withinContentContainer) {
    return (
      <WithinContentContainerBanner {...sharedBannerProps}>
        {children}
      </WithinContentContainerBanner>
    );
  }

  if (isInlineIconBanner) {
    return (
      <InlineIconBanner {...sharedBannerProps}>{children}</InlineIconBanner>
    );
  }

  return <DefaultBanner {...sharedBannerProps}>{children}</DefaultBanner>;
}

export function DefaultBanner({
  backgroundColor,
  textColor,
  bannerTitle,
  bannerIcon,
  actionButtons,
  dismissButton,
  children,
}: PropsWithChildren<BannerLayoutProps>) {
  const {smUp} = useBreakpoints();
  const hasContent = children || actionButtons;

  return (
    <Box width="100%">
      <BlockStack align="space-between">
        <Box
          background={backgroundColor}
          color={textColor}
          borderStartStartRadius={smUp ? '300' : undefined}
          borderStartEndRadius={smUp ? '300' : undefined}
          borderEndStartRadius={!hasContent && smUp ? '300' : undefined}
          borderEndEndRadius={!hasContent && smUp ? '300' : undefined}
          padding="300"
        >
          <InlineStack
            align="space-between"
            blockAlign="center"
            gap="200"
            wrap={false}
          >
            <InlineStack gap="100" wrap={false}>
              {bannerIcon}
              {bannerTitle}
            </InlineStack>
            {dismissButton}
          </InlineStack>
        </Box>
        {hasContent && (
          <Box padding={{xs: '300', md: '400'}} paddingBlockStart="300">
            <BlockStack gap="200">
              <div>{children}</div>
              {actionButtons}
            </BlockStack>
          </Box>
        )}
      </BlockStack>
    </Box>
  );
}

export function InlineIconBanner({
  backgroundColor,
  bannerIcon,
  actionButtons,
  dismissButton,
  children,
}: PropsWithChildren<Omit<BannerLayoutProps, 'textColor' | 'bannerTitle'>>) {
  const [blockAlign, setBlockAlign] =
    useState<InlineStackProps['blockAlign']>('center');
  const contentNode = useRef<HTMLDivElement>(null);
  const iconNode = useRef<HTMLDivElement>(null);
  const dismissIconNode = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    const contentHeight = contentNode.current?.offsetHeight;
    const iconBoxHeight =
      iconNode.current?.offsetHeight || dismissIconNode.current?.offsetHeight;

    if (!contentHeight || !iconBoxHeight) return;

    contentHeight > iconBoxHeight
      ? setBlockAlign('start')
      : setBlockAlign('center');
  }, []);

  useEffect(() => handleResize(), [handleResize]);
  useEventListener('resize', handleResize);

  return (
    <Box width="100%" padding="300" borderRadius="300">
      <InlineStack align="space-between" blockAlign={blockAlign} wrap={false}>
        <Box width="100%">
          <InlineStack gap="200" wrap={false} blockAlign={blockAlign}>
            {bannerIcon ? (
              <div ref={iconNode}>
                <Box
                  background={backgroundColor}
                  borderRadius="200"
                  padding="100"
                >
                  {bannerIcon}
                </Box>
              </div>
            ) : null}
            <Box ref={contentNode} width="100%">
              <BlockStack gap="200">
                <div>{children}</div>
                {actionButtons}
              </BlockStack>
            </Box>
          </InlineStack>
        </Box>
        <div ref={dismissIconNode} className={styles.DismissIcon}>
          {dismissButton}
        </div>
      </InlineStack>
    </Box>
  );
}

export function WithinContentContainerBanner({
  backgroundColor,
  textColor,
  bannerTitle,
  bannerIcon,
  actionButtons,
  dismissButton,
  children,
}: PropsWithChildren<BannerLayoutProps>) {
  return (
    <Box
      width="100%"
      background={backgroundColor}
      padding="200"
      borderRadius="200"
      color={textColor}
    >
      <InlineStack
        align="space-between"
        blockAlign="start"
        wrap={false}
        gap="200"
      >
        <InlineStack gap="150" wrap={false}>
          {bannerIcon}
          <Box width="100%">
            <BlockStack gap="200">
              <BlockStack gap="050">
                {bannerTitle}
                <div>{children}</div>
              </BlockStack>
              {actionButtons}
            </BlockStack>
          </Box>
        </InlineStack>
        {dismissButton}
      </InlineStack>
    </Box>
  );
}
