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
import {CancelMinor} from '@shopify/polaris-icons';

import type {Action, DisableableAction, LoadableAction} from '../../types';
import {Text} from '../Text';
import {VerticalStack} from '../VerticalStack';
import type {HorizontalStackProps} from '../HorizontalStack';
import {HorizontalStack} from '../HorizontalStack';
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

import styles from './Banner.scss';
import type {BannerHandles} from './utilities';
import {bannerAttributes, useBannerFocus} from './utilities';

export type BannerStatus = 'success' | 'info' | 'warning' | 'critical';

export interface BannerProps {
  /** Title content for the banner. */
  title?: string;
  /** Status icon to display in the banner. Use only major icons */
  icon?: IconProps['source'];
  /** Renders the banner without a status icon. */
  hideIcon?: boolean;
  /** Sets the status of the banner. */
  status?: BannerStatus;
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
  const {status, stopAnnouncements} = props;
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
        role={
          status === 'warning' || status === 'critical' ? 'alert' : 'status'
        }
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
  status = 'info',
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
  const bannerStatus = Object.keys(bannerAttributes).includes(status)
    ? status
    : 'info';
  const bannerColors =
    bannerAttributes[bannerStatus][
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
        <Icon source={icon ?? bannerAttributes[bannerStatus].icon} />
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
        plain
        primary
        icon={
          <span
            className={
              styles[isInlineIconBanner ? 'icon-subdued' : bannerColors.icon]
            }
          >
            <Icon source={CancelMinor} />
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
      <VerticalStack align="space-between">
        <Box
          background={backgroundColor}
          color={textColor}
          borderRadiusStartStart={smUp ? '3' : undefined}
          borderRadiusStartEnd={smUp ? '3' : undefined}
          borderRadiusEndStart={!hasContent && smUp ? '3' : undefined}
          borderRadiusEndEnd={!hasContent && smUp ? '3' : undefined}
          padding="3"
        >
          <HorizontalStack
            align="space-between"
            blockAlign="center"
            gap="2"
            wrap={false}
          >
            <HorizontalStack gap="1" wrap={false}>
              {bannerIcon}
              {bannerTitle}
            </HorizontalStack>
            {dismissButton}
          </HorizontalStack>
        </Box>
        {hasContent && (
          <Box padding={{xs: '3', md: '4'}} paddingBlockStart="3">
            <VerticalStack gap="2">
              <div>{children}</div>
              {actionButtons}
            </VerticalStack>
          </Box>
        )}
      </VerticalStack>
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
    useState<HorizontalStackProps['blockAlign']>('center');
  const contentNode = useRef<HTMLDivElement>(null);
  const iconNode = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    const contentHeight = contentNode.current?.offsetHeight;
    const iconBoxHeight = iconNode.current?.offsetHeight;

    if (!contentHeight || !iconBoxHeight) return;

    contentHeight > iconBoxHeight
      ? setBlockAlign('start')
      : setBlockAlign('center');
  }, []);

  useEffect(() => handleResize(), [handleResize]);
  useEventListener('resize', handleResize);

  return (
    <Box width="100%" padding="3" borderRadius="3">
      <HorizontalStack
        align="space-between"
        blockAlign={blockAlign}
        wrap={false}
      >
        <Box width="100%">
          <HorizontalStack gap="2" wrap={false} blockAlign={blockAlign}>
            {bannerIcon ? (
              <div ref={iconNode}>
                <Box background={backgroundColor} borderRadius="2" padding="1">
                  {bannerIcon}
                </Box>
              </div>
            ) : null}
            <Box ref={contentNode} width="100%">
              <VerticalStack gap="2">
                <div>{children}</div>
                {actionButtons}
              </VerticalStack>
            </Box>
          </HorizontalStack>
        </Box>
        {dismissButton}
      </HorizontalStack>
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
      padding="2"
      borderRadius="2"
      color={textColor}
    >
      <HorizontalStack
        align="space-between"
        blockAlign="start"
        wrap={false}
        gap="2"
      >
        <HorizontalStack gap="1_5-experimental" wrap={false}>
          {bannerIcon}
          <Box width="100%">
            <VerticalStack gap="2">
              <VerticalStack gap="05">
                {bannerTitle}
                <div>{children}</div>
              </VerticalStack>
              {actionButtons}
            </VerticalStack>
          </Box>
        </HorizontalStack>
        {dismissButton}
      </HorizontalStack>
    </Box>
  );
}
