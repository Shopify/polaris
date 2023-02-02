import React, {
  forwardRef,
  useRef,
  useState,
  useContext,
  useImperativeHandle,
} from 'react';
import {
  CancelSmallMinor,
  CircleTickMajor,
  CircleInformationMajor,
  CircleAlertMajor,
  DiamondAlertMajor,
} from '@shopify/polaris-icons';

import {classNames, variationName} from '../../utilities/css';
import {BannerContext} from '../../utilities/banner-context';
import {useI18n} from '../../utilities/i18n';
import type {Action, DisableableAction, LoadableAction} from '../../types';
import {Button} from '../Button';
import {ButtonGroup} from '../ButtonGroup';
import {UnstyledButton, unstyledButtonFrom} from '../UnstyledButton';
import {UnstyledLink} from '../UnstyledLink';
import {Spinner} from '../Spinner';
import {Icon, IconProps} from '../Icon';
import {WithinContentContext} from '../../utilities/within-content-context';
import {Text} from '../Text';
import {Box} from '../Box';
import {Bleed} from '../Bleed';
import {Inline} from '../Inline';

import styles from './Banner.scss';

export type BannerStatus = 'success' | 'info' | 'warning' | 'critical';

export interface BannerProps {
  /** Title content for the banner. */
  title?: string;
  /** Icon to display in the banner. Use only major, duotone icons */
  icon?: IconProps['source'];
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
  {
    icon,
    action,
    secondaryAction,
    title,
    children,
    status,
    onDismiss,
    stopAnnouncements,
  }: BannerProps,
  bannerRef,
) {
  const withinContentContainer = useContext(WithinContentContext);
  const i18n = useI18n();
  const {wrapperRef, handleKeyUp, handleBlur, handleMouseUp, shouldShowFocus} =
    useBannerFocus(bannerRef);
  const {defaultIcon, iconColor, ariaRoleType} = useBannerAttributes(status);
  const iconName = icon || defaultIcon;
  const className = classNames(
    styles.Banner,
    status && styles[variationName('status', status)],
    onDismiss && styles.hasDismiss,
    shouldShowFocus && styles.keyFocused,
    withinContentContainer ? styles.withinContentContainer : styles.withinPage,
  );

  let headingMarkup: React.ReactNode = null;

  if (title) {
    headingMarkup = (
      <Text as="h2" variant="headingMd">
        {title}
      </Text>
    );
  }

  const spinnerMarkup = action?.loading ? (
    <button
      disabled
      aria-busy
      className={classNames(styles.Button, styles.loading)}
    >
      <span className={styles.Spinner}>
        <Spinner
          size="small"
          accessibilityLabel={i18n.translate(
            'Polaris.Button.spinnerAccessibilityLabel',
          )}
        />
      </span>
      {action.content}
    </button>
  ) : null;

  const primaryActionMarkup = action ? (
    <Box paddingInlineEnd="2">
      {action.loading
        ? spinnerMarkup
        : unstyledButtonFrom(action, {
            className: `${styles.Button} ${styles.PrimaryAction}`,
          })}
    </Box>
  ) : null;

  const secondaryActionMarkup = secondaryAction ? (
    <SecondaryActionFrom action={secondaryAction} />
  ) : null;

  const actionMarkup =
    action || secondaryAction ? (
      <Box
        paddingBlockStart={withinContentContainer ? '3' : '4'}
        paddingBlockEnd={withinContentContainer ? '1' : undefined}
      >
        <ButtonGroup>
          {primaryActionMarkup}
          {secondaryActionMarkup}
        </ButtonGroup>
      </Box>
    ) : null;

  let contentMarkup: React.ReactNode = null;

  if (children || actionMarkup) {
    contentMarkup = (
      <Box paddingBlockStart="05" paddingBlockEnd="05">
        {children}
        {actionMarkup}
      </Box>
    );
  }

  const dismissButton = onDismiss && (
    <div className={styles.Dismiss}>
      <Button
        plain
        icon={CancelSmallMinor}
        onClick={onDismiss}
        accessibilityLabel="Dismiss notification"
      />
    </div>
  );

  return (
    <BannerContext.Provider value>
      <div
        className={className}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        ref={wrapperRef}
        role={ariaRoleType}
        aria-live={stopAnnouncements ? 'off' : 'polite'}
        onMouseUp={handleMouseUp}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
      >
        {dismissButton}

        <Box paddingInlineEnd="4">
          <Icon source={iconName} color={iconColor} />
        </Box>

        <div className={styles.ContentWrapper}>
          {headingMarkup}
          {contentMarkup}
        </div>
      </div>
    </BannerContext.Provider>
  );
});

function SecondaryActionFrom({action}: {action: Action}) {
  if (action.url) {
    return (
      <UnstyledLink
        className={styles.SecondaryAction}
        url={action.url}
        external={action.external}
      >
        <span className={styles.Text}>{action.content}</span>
      </UnstyledLink>
    );
  }

  return (
    <UnstyledButton
      className={styles.SecondaryAction}
      onClick={action.onAction}
    >
      <span className={styles.Text}>{action.content}</span>
    </UnstyledButton>
  );
}

interface BannerAttributes {
  iconColor: IconProps['color'];
  defaultIcon: IconProps['source'];
  ariaRoleType: 'status' | 'alert';
}

function useBannerAttributes(status: BannerProps['status']): BannerAttributes {
  switch (status) {
    case 'success':
      return {
        defaultIcon: CircleTickMajor,
        iconColor: 'success',
        ariaRoleType: 'status',
      };

    case 'info':
      return {
        defaultIcon: CircleInformationMajor,
        iconColor: 'highlight',
        ariaRoleType: 'status',
      };

    case 'warning':
      return {
        defaultIcon: CircleAlertMajor,
        iconColor: 'warning',
        ariaRoleType: 'alert',
      };

    case 'critical':
      return {
        defaultIcon: DiamondAlertMajor,
        iconColor: 'critical',
        ariaRoleType: 'alert',
      };

    default:
      return {
        defaultIcon: CircleInformationMajor,
        iconColor: 'base',
        ariaRoleType: 'status',
      };
  }
}

export interface BannerHandles {
  focus(): void;
}

function useBannerFocus(bannerRef: React.Ref<BannerHandles>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldShowFocus, setShouldShowFocus] = useState(false);

  useImperativeHandle(
    bannerRef,
    () => ({
      focus: () => {
        wrapperRef.current?.focus();
        setShouldShowFocus(true);
      },
    }),
    [],
  );

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target === wrapperRef.current) {
      setShouldShowFocus(true);
    }
  };

  const handleBlur = () => setShouldShowFocus(false);
  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.blur();
    setShouldShowFocus(false);
  };

  return {
    wrapperRef,
    handleKeyUp,
    handleBlur,
    handleMouseUp,
    shouldShowFocus,
  };
}
