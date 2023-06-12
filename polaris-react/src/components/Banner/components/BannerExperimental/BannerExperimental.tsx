import type {PropsWithChildren} from 'react';
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from 'react';
import type {ColorTextAlias} from '@shopify/polaris-tokens';
import {CancelMinor} from '@shopify/polaris-icons';

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
import {useI18n} from '../../../../utilities/i18n';
import {Icon} from '../../../Icon';

import {useBannerAttributes} from './utilities';
import styles from './BannerExperimental.scss';

interface BannerLayoutProps {
  backgroundColor: BoxProps['background'];
  textColor: ColorTextAlias;
  bannerTitle: React.ReactNode;
  bannerIcon: React.ReactNode;
  actionButtons: React.ReactNode;
  dismissButton: React.ReactNode;
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
  const {backgroundColor, textColor, iconColor, StatusIcon} =
    useBannerAttributes(status);

  const isNoTitleBanner = !title && !withinContentContainer;

  const statusIcon = (
    <span className={styles[iconColor]}>
      <Icon source={icon ?? StatusIcon} />
    </span>
  );

  const closeIcon = (
    <span className={styles[isNoTitleBanner ? 'icon-subdued' : iconColor]}>
      <Icon source={CancelMinor} />
    </span>
  );

  const bannerIcon = hideIcon ? null : statusIcon;

  const dismissButton = onDismiss ? (
    <Button
      plain
      primary
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
}: PropsWithChildren<BannerLayoutProps>) {
  const {smUp} = useBreakpoints();
  const hasContent = children || actionButtons;

  return (
    <Box width="100%">
      <VerticalStack align="space-between">
        <div className={styles.Bar}>
          <Box
            background={backgroundColor}
            color={textColor}
            borderRadiusStartStart={smUp ? '3' : undefined}
            borderRadiusStartEnd={smUp ? '3' : undefined}
            borderRadiusEndStart={!hasContent && smUp ? '3' : undefined}
            borderRadiusEndEnd={!hasContent && smUp ? '3' : undefined}
            padding="2"
          >
            <HorizontalStack
              align="space-between"
              blockAlign="center"
              gap="2"
              wrap={false}
            >
              <Box padding="1" paddingInlineStart={smUp ? '1' : '0'}>
                <HorizontalStack gap="1_5-experimental" wrap={false}>
                  {bannerIcon}
                  {bannerTitle}
                </HorizontalStack>
              </Box>
              {dismissButton}
            </HorizontalStack>
          </Box>
        </div>
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

function NoTitleBanner({
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
    const contentHeight = contentNode?.current?.offsetHeight;
    const iconBoxHeight = iconNode?.current?.offsetHeight;

    if (!contentHeight || !iconBoxHeight) return;

    if (contentHeight > iconBoxHeight) {
      setBlockAlign('start');
    } else {
      setBlockAlign('center');
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
    <Box width="100%" padding="2" borderRadius="3">
      <HorizontalStack
        align="space-between"
        blockAlign={blockAlign}
        wrap={false}
      >
        <Box padding="1" width="100%">
          <HorizontalStack gap="2" wrap={false} blockAlign={blockAlign}>
            <div ref={iconNode}>
              <Box background={backgroundColor} borderRadius="2" padding="1">
                {bannerIcon}
              </Box>
            </div>
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

function WithinContentContainerBanner({
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
      padding="1"
      borderRadius="2"
      color={textColor}
    >
      <HorizontalStack align="space-between" blockAlign="start" wrap={false}>
        <Box padding="1" width="100%">
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
        </Box>
        {dismissButton}
      </HorizontalStack>
    </Box>
  );
}
