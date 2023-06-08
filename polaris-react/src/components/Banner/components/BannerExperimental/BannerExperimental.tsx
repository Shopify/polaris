import type {PropsWithChildren} from 'react';
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from 'react';
import type {ColorTextAlias} from '@shopify/polaris-tokens';

import {Text} from '../../../Text';
import {VerticalStack} from '../../../VerticalStack';
import type {HorizontalStackProps} from '../../../HorizontalStack';
import {HorizontalStack} from '../../../HorizontalStack';
import {useBreakpoints} from '../../../../utilities/breakpoints';
import {WithinContentContext} from '../../../../utilities/within-content-context';
import type {BoxProps} from '../../../Box';
import {Box} from '../../../Box';
import {Button} from '../../../Button';
import {ButtonGroup} from '../../../ButtonGroup';
import type {BannerProps} from '../../Banner';
import {Icon} from '../../../Icon';
import {useI18n} from '../../../../utilities/i18n';

import {useBannerColors} from './utilities';

interface BannerLayoutProps {
  backgroundColor: BoxProps['background'];
  textColor: ColorTextAlias;
  bannerTitle: React.ReactNode;
  bannerIcon: React.ReactNode;
  actionButtons: React.ReactNode;
  dismissButton: React.ReactNode;
  onDismiss: BannerProps['onDismiss'];
}

export function BannerExperimental({
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
  const isNoTitleBanner = !title && !withinContentContainer;
  const {iconRGBA, backgroundColor, textColor, statusIcon, closeIcon} =
    useBannerColors(status, isNoTitleBanner);

  const bannerIcon = hideIcon ? null : (
    <Box paddingInlineStart={isNoTitleBanner ? '0' : '05'}>
      {icon ? (
        <span style={{fill: iconRGBA}}>
          <Icon source={icon} />
        </span>
      ) : (
        <Icon source={statusIcon} />
      )}
    </Box>
  );

  const dismissButton = onDismiss ? (
    <Button
      plain
      icon={closeIcon}
      onClick={onDismiss}
      accessibilityLabel={i18n.translate('Polaris.Banner.dismissButton')}
    />
  ) : null;

  const actionButtons =
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
    ) : null;

  const bannerTitle = title ? (
    <Text as="h2" variant="headingSm" breakWord>
      {title}
    </Text>
  ) : null;

  const bannerLayoutProps: BannerLayoutProps = {
    onDismiss,
    backgroundColor,
    textColor,
    bannerTitle,
    bannerIcon,
    actionButtons,
    dismissButton,
  };

  if (withinContentContainer) {
    return (
      <WithinContentContainerBanner {...bannerLayoutProps}>
        {children}
      </WithinContentContainerBanner>
    );
  }

  if (isNoTitleBanner) {
    return <NoTitleBanner {...bannerLayoutProps}>{children}</NoTitleBanner>;
  }

  return <DefaultBanner {...bannerLayoutProps}>{children}</DefaultBanner>;
}

function DefaultBanner({
  backgroundColor,
  textColor,
  bannerTitle,
  bannerIcon,
  actionButtons,
  dismissButton,
  children,
}: PropsWithChildren<Omit<BannerLayoutProps, 'onDismiss'>>) {
  const {smDown} = useBreakpoints();
  const hasContent = children || actionButtons;

  return (
    <Box width="100%">
      <VerticalStack align="space-between">
        <Box
          background={backgroundColor}
          color={textColor}
          borderRadiusStartStart={smDown ? undefined : '2'}
          borderRadiusStartEnd={smDown ? undefined : '2'}
          borderRadiusEndStart={hasContent || smDown ? undefined : '2'}
          borderRadiusEndEnd={hasContent || smDown ? undefined : '2'}
          padding={{xs: '2', sm: '3'}}
          paddingInlineEnd={{xs: '3', sm: '4'}}
        >
          <HorizontalStack
            align="space-between"
            blockAlign="center"
            gap="2"
            wrap={false}
          >
            <HorizontalStack gap="2" wrap={false}>
              {bannerIcon}
              {bannerTitle}
            </HorizontalStack>
            {dismissButton}
          </HorizontalStack>
        </Box>
        {hasContent && (
          <Box padding={{xs: '3', sm: '4'}} paddingBlockStart="3">
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

function NoTitleBanner({
  onDismiss,
  backgroundColor,
  bannerIcon,
  actionButtons,
  dismissButton,
  children,
}: PropsWithChildren<Omit<BannerLayoutProps, 'textColor' | 'bannerTitle'>>) {
  const [blockAlign, setBlockAlgin] =
    useState<HorizontalStackProps['blockAlign']>('center');
  const contentNode = useRef<HTMLDivElement>(null);
  const iconNode = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    const contentHeight = contentNode?.current?.offsetHeight;
    const iconBoxHeight = iconNode?.current?.offsetHeight;

    if (!contentHeight || !iconBoxHeight) return;

    if (contentHeight > iconBoxHeight) {
      setBlockAlgin('start');
    } else {
      setBlockAlgin('center');
    }
  }, []);

  useEffect(() => handleResize(), [handleResize]);

  useEffect(() => {
    if (!contentNode.current) return;

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <Box width="100%" padding="3" borderRadius="2">
      <HorizontalStack align="space-between" blockAlign="start" wrap={false}>
        <Box paddingInlineEnd={onDismiss ? '2' : undefined}>
          <HorizontalStack gap="2" wrap={false} blockAlign={blockAlign}>
            <div ref={iconNode}>
              <Box background={backgroundColor} borderRadius="2" padding="1">
                {bannerIcon}
              </Box>
            </div>
            <div ref={contentNode}>
              <VerticalStack gap="2">
                <div>{children}</div>
                {actionButtons}
              </VerticalStack>
            </div>
          </HorizontalStack>
        </Box>
        {dismissButton}
      </HorizontalStack>
    </Box>
  );
}

function WithinContentContainerBanner({
  onDismiss,
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
      <HorizontalStack align="space-between" blockAlign="start" wrap={false}>
        <Box paddingInlineEnd={onDismiss ? '2' : undefined}>
          <HorizontalStack gap="2" wrap={false}>
            {bannerIcon}
            <VerticalStack gap="2">
              <VerticalStack gap="05">
                {bannerTitle}
                <div>{children}</div>
              </VerticalStack>
              {actionButtons}
            </VerticalStack>
          </HorizontalStack>
        </Box>
        {dismissButton}
      </HorizontalStack>
    </Box>
  );
}
