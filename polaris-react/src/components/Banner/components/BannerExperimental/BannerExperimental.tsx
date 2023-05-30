import React, {useContext} from 'react';

import {Text} from '../../../Text';
import {VerticalStack} from '../../../VerticalStack';
import {HorizontalStack} from '../../../HorizontalStack';
import {useBreakpoints} from '../../../../utilities/breakpoints';
import {WithinContentContext} from '../../../../utilities/within-content-context';
import {Box} from '../../../Box';
import {Button} from '../../../Button';
import {ButtonGroup} from '../../../ButtonGroup';
import type {BannerProps} from '../../Banner';
import {Icon} from '../../../Icon';
import {useI18n} from '../../../../utilities/i18n';

import {useBannerColors} from './utilities';

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
  const {smDown} = useBreakpoints();
  const {iconRGBA, backgroundColor, textColor, statusIcon, closeIcon} =
    useBannerColors(status);

  const bannerIcon = hideIcon ? null : (
    <Box paddingInlineStart="05">
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

  const hasContent = children || action || secondaryAction;

  return withinContentContainer ? (
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
                {children}
              </VerticalStack>
              {actionButtons}
            </VerticalStack>
          </HorizontalStack>
        </Box>
        {dismissButton}
      </HorizontalStack>
    </Box>
  ) : (
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
              {children}
              {actionButtons}
            </VerticalStack>
          </Box>
        )}
      </VerticalStack>
    </Box>
  );
}
